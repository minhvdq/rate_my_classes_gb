import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Select, Tag, Divider, Card, Statistic, Row, Col, Button, Empty } from 'antd';
import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import ReviewHeader from './ReviewHeader';
import CommentPage from './Comment';
import classService from '../../services/class';
import reviewService from '../../services/review';
import professorService from '../../services/professor';
import ReviewCard from './ReviewCard'
import Footer from '../items/Footer'
import './Review.css';
import { frontendBase } from '../../utils/homeUrl';

export default function ReviewPage({ curUser, setCurUser, classes }) {
  const [curClass, setCurClass] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [presentReviews, setPresentReviews] = useState([]);
  const [profOptions, setProfOptions] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [totalDifficulty, setTotalDifficulty] = useState(0);
  const [totalWorkload, setTotalWorkload] = useState(0);
  const [attendance, setAttendance] = useState(false);
  const [inComment, setInComment] = useState(false);
  const [selectedValue, setSelectedValue] = useState("All");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  /**
   * fetch all data for the current page
   */
  const fetchData = async () => {
    setLoading(true);
    try {
      // fetch the class Information from database using id - last endpoint
      const data = await classService.getByID(id);
      const foundClass = data.data;

      // Throw error if there is no such class in the database
      if (!foundClass) {
        throw new Error("NO PAGE FOUND");
      }

      setCurClass(foundClass);
      let department = foundClass.department;
      const professorsData = await professorService.getByDepartment(department);
      const professors = professorsData.data;
      if(!professors) {
        throw new Error("NO PROFESSORS FOUND");
      }

      console.log('Professors data:', professors);
      setProfessors(professors);

      // Set the hook state of professors - for the options
      const arr = professors.map(prof => {
        console.log('Professor data:', prof);
        return { value: prof._id || prof.id, label: prof.name };
      });
      arr.unshift({ value: "All", label: "All Professors" });
      setProfOptions(arr);

      // fetch all the reviews belong to this class
      const reviewPromises = foundClass.reviews.map(async rvId => {
        const data = await reviewService.getByID(rvId);
        const foundReview = data.data;
        console.log('Review data:', foundReview);
        return foundReview;
      });

      let fetchedReviews = await Promise.all(reviewPromises);

      fetchedReviews = fetchedReviews.sort((a, b) => new Date(b.postBy) - new Date(a.postBy));  
      console.log('Fetched reviews:', fetchedReviews);

      // Update state after all reviews are fetched
      setReviews(fetchedReviews);
      setPresentReviews(fetchedReviews);

      const totalDiff = fetchedReviews.reduce((sum, review) => sum + review.difficulty, 0);
      const totalWork = fetchedReviews.reduce((sum, review) => sum + review.workload, 0);

      let totalAttendance = 0;
      for (let review of fetchedReviews) {
        if (review.attendance) totalAttendance++;
      }
      setAttendance(totalAttendance > (fetchedReviews.length / 2));

      setTotalDifficulty(totalDiff);
      setTotalWorkload(totalWork);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const togglePage = () => {
    setInComment(!inComment);
  };

  /**
   * Handle leave comment button onClick
   * @param {*} e The event value
   */
  const handleComment = (e) => {
    e.preventDefault();
    if (!curUser) {
      window.localStorage.setItem("loginDirect", window.location.href)
      window.location.href = `${frontendBase}/authen`;
    } else {
      togglePage();
    }
  };

  /**
   * Handle tha onChange event of the Professor select
   * @param {*} value The value of selected Professor
   */
  const handleChange = (value) => {
    setSelectedValue(value);
    
    if (value === "All") {
      setPresentReviews([...reviews]);
      let totalD = 0;
      let totalW = 0;
      let totalA = 0;
      for (let review of reviews) {
        totalD += review.difficulty;
        totalW += review.workload;
        if (review.attendance) totalA++;
      }
      setAttendance(totalA > (reviews.length / 2));
      setTotalDifficulty(totalD);
      setTotalWorkload(totalW);
    } else {
      console.log('Selected professor value:', value);
      const sortedReviews = [...reviews].filter(review => {
        console.log('Comparing:', review.professor, value);
        return review.professor === value;
      });
      setPresentReviews(sortedReviews);

      let totalD = 0;
      let totalW = 0;
      let totalA = 0;     
      for (let review of sortedReviews) {
        totalD += review.difficulty;
        totalW += review.workload;
        if (review.attendance) totalA++;
      }
      setAttendance(totalA > (sortedReviews.length / 2));
      setTotalDifficulty(totalD);
      setTotalWorkload(totalW);
    }
  };

  // Function to get color based on rating value
  const getRatingColor = (value) => {
    if (value < 2) return "green";
    if (value < 4) return "orange";
    return "red";
  };

  const deleteReview = async (id) => {
    if (window.confirm(`Remove this review ?`)) {
      try {
        reviewService.setToken(curUser.token);
        await reviewService.remove(id);
  
        // Filter out the deleted review
        const updatedReviews = reviews.filter(review => review.id !== id);
        const updatedPresentReviews = presentReviews.filter(review => review.id !== id);
  
        // Recalculate total difficulty and workload
        const newTotalDifficulty = updatedPresentReviews.reduce((sum, review) => sum + review.difficulty, 0);
        const newTotalWorkload = updatedPresentReviews.reduce((sum, review) => sum + review.workload, 0);
  
        // Recalculate attendance
        const newAttendance = updatedPresentReviews.filter(r => r.attendance).length > (updatedPresentReviews.length / 2);
  
        setReviews(updatedReviews);
        setPresentReviews(updatedPresentReviews);
        setTotalDifficulty(newTotalDifficulty);
        setTotalWorkload(newTotalWorkload);
        setAttendance(newAttendance);
  
      } catch (error) {
        console.error("Failed to delete review:", error);
      }
    }
  };

  // Score box component
  const ScoreBox = ({ score, label }) => (
    <div className="text-center">
      <div className="text-muted small mb-2">{label}</div>
      <div 
        style={{
          backgroundColor: getRatingColor(score),
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontWeight: 'bold',
          display: 'inline-block',
          minWidth: '60px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}
      >
        {score}
      </div>
    </div>
  );

  const MainReviewPage = () => {
    const avgDifficulty = presentReviews.length ? (totalDifficulty / presentReviews.length).toFixed(1) : 0;
    const avgWorkload = presentReviews.length ? (totalWorkload / presentReviews.length).toFixed(1) : 0;

    return (
      <div className="review-page-container">
        {/* Fixed header that stays on top with 20vh height */}
        <div className="fixed-header" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20vh',
          zIndex: 1000,
          backgroundColor: 'white',
          // boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <ReviewHeader classes={classes} curUser={curUser} setCurUser={setCurUser} />
        </div>
        
        <div className="container py-5 pb-0" style={{ 
          marginTop: '20vh', 
          paddingTop: '2rem' 
        }}>
          {/* Class Header Card */}
          <Card 
            className="shadow border-0 mb-4" 
            loading={loading}
          >
            <Row gutter={24} align="middle">
              <Col xs={24} md={14}>
                <div>
                  <h1 className="mb-1">{curClass?.name || ""}</h1>
                  <h5 className="text-muted mb-3">{curClass?.department || ""}</h5>
                  
                  <div className="d-flex align-items-center mt-3">
                    <span className="me-2 fw-bold">Instructor:</span>
                    <Select
                      value={selectedValue}
                      style={{ width: 200 }}
                      onChange={handleChange}
                      options={profOptions}
                      placeholder="Select Professor"
                      className="mb-2"
                      suffixIcon={<UserOutlined />}
                    />
                  </div>
                </div>
              </Col>
              
              <Col xs={24} md={10}>
                <Card className="border-0 bg-light">
                  <Row gutter={16}>
                    <Col span={8}>
                      <ScoreBox score={avgDifficulty} label="Difficulty" />
                    </Col>
                    <Col span={8}>
                      <ScoreBox score={avgWorkload} label="Workload" />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Attendance"
                        value={attendance ? "Required" : "Optional"}
                        valueStyle={{ color: attendance ? '#cf1322' : '#3f8600' }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>

          {/* Add Review Button */}
          <div className="d-flex justify-content-end mb-4">
            <Button 
              type="primary" 
              size="large" 
              icon={<CommentOutlined />} 
              onClick={handleComment}
              className="shadow"
            >
              Add Your Review
            </Button>
          </div>

          {/* Reviews */}
          <div className="reviews-container">
            <h2 className="mb-4">
              <span className="me-2">Student Reviews</span>
              <Tag color="blue">{presentReviews.length}</Tag>
            </h2>
            
            {presentReviews.length > 0 ? (
              presentReviews.map(review => (
                <ReviewCard key={review.id} professors={professors} review={review} curUser={curUser} deleteReview={() => deleteReview(review.id)} getRatingColor={getRatingColor}/>
              ))
            ) : (
              <Empty
                description={
                  <span>
                    No reviews for {selectedValue !== "All" ? professors.find(prof => prof.id === selectedValue).name : "this class"} yet.
                    Be the first to add one!
                  </span>
                }
              />
            )}
          </div>

          <Divider />

          <Footer />
        </div>
      </div>
    );
  };

  return (
    <>
      {inComment ? <CommentPage curUser={curUser} curClass={curClass} togglePage={togglePage} professors={professors} /> : <MainReviewPage />}
    </>
  );
}