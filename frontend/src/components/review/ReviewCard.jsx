import { Tag, Avatar, Card, Row, Col, Button } from 'antd';
import { UserOutlined, CalendarOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

export default function ReviewCard({ loading, review, curUser, deleteReview, getRatingColor, professors }) {
  const [check, setCheck] = useState(false)
  
  useEffect(() => {
    setCheck(curUser?.reviews.includes(review.id))
  }, [curUser])
  
  console.log("for " + review.id + " " + curUser?.reviews)

  return (
    <Card 
      key={review.id} 
      className="review-card"
      hoverable
    >
      {/* Review Header */}
      <div className="review-card-header">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={10}>
            <div className="reviewer-info">
              <Avatar size="large" icon={<UserOutlined />} className="reviewer-avatar" />
              <div className="reviewer-details">
                <div className="reviewer-name">
                  {professors.find(prof => (prof._id === review.professor || prof.id === review.professor))?.name || 'Unknown Professor'}
                </div>
                <Tag color="blue" className="grade-tag">Grade: {review.grade}</Tag>
              </div>
            </div>
          </Col>

          <Col xs={12} md={7}>
            <div className="review-ratings">
              <div className="rating-item">
                <div className="rating-label">Difficulty</div>
                <div 
                  className="rating-badge"
                  style={{ backgroundColor: getRatingColor(review.difficulty) }}
                >
                  {review.difficulty}/5
                </div>
              </div>
              <div className="rating-item">
                <div className="rating-label">Workload</div>
                <div 
                  className="rating-badge"
                  style={{ backgroundColor: getRatingColor(review.workload) }}
                >
                  {review.workload}/5
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} md={7}>
            <div className="review-meta">
              <div className="term-info">
                <CalendarOutlined className="me-1" />
                {review.term} {review.year}
              </div>
              <Tag 
                color={review.attendance ? "red" : "green"}
                className="attendance-tag"
              >
                Attendance: {review.attendance ? "Required" : "Optional"}
              </Tag>
            </div>
          </Col>
        </Row>
      </div>

      {/* Review Comment */}
      {review.comment && (
        <div className="review-comment">
          <p className="comment-text">{review.comment}</p>
        </div>
      )}

      {/* Review Footer */}
      <div className="review-card-footer">
        <div className="review-date">
          Posted on: {new Date(review.postBy).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
        
        {check && (
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => deleteReview(review.id)}
            loading={loading}
            className="delete-btn"
            size="small"
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
}
