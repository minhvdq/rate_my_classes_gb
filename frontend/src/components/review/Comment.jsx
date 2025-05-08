import { Select, Rate, Switch, Button, Form, Input, Divider, message } from 'antd';
import { useState } from 'react';
import { UserOutlined, FormOutlined, FieldTimeOutlined, StarFilled, TrophyOutlined, CalendarOutlined } from '@ant-design/icons';
// If you're still having issues with specific icons, you can import them all
// import * as Icons from '@ant-design/icons';
import reviewService from '../../services/review';
import { frontendBase } from '../../utils/homeUrl';

const { TextArea } = Input;
const { Option } = Select;

export default function Comment({ curUser, curClass, togglePage, professors }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // Pre-define current year and available years
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i);
  
  // Pre-define grade options
  const grades = ["N/A", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

  const handleSubmit = async (values) => {
    if (!curUser) {
      window.location.href = `${frontendBase}/authen`;
      return;
    }

    setLoading(true);
    
    const requestBody = {
      class: curClass.id,
      user: curUser.id,
      professor: values.professor,
      comment: values.comment,
      workload: values.workload,
      difficulty: values.difficulty,
      attendance: values.attendance,
      grade: values.grade,
      term: values.term,
      year: values.year
    };

    try {
      reviewService.setToken(curUser.token)
      await reviewService.submitReview(requestBody);
      message.success("Review submitted successfully!");
      window.location.href = `${frontendBase}/review/${curClass.id}`;
    } catch (error) {
      message.error("Failed to submit review. Please check all required fields.");
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center py-3">
              <h2 className="m-0">
                <FormOutlined className="me-2" /> 
                Rate Your Class Experience
              </h2>
              <h4 className="mt-2 mb-0">{curClass?.name || ""}</h4>
            </div>
            
            <div className="card-body p-4">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                  difficulty: 3,
                  workload: 3,
                  attendance: false,
                  term: "Fall",
                  year: currentYear,
                  grade: "N/A"
                }}
              >
                {/* Professor Selection */}
                <Form.Item
                  name="professor"
                  label={<span className="fw-bold"><UserOutlined className="me-1" /> Professor</span>}
                  rules={[{ required: true, message: 'Please select a professor' }]}
                >
                  <Select placeholder="Select your professor">
                    {professors?.map(professor => (
                      <Option key={professor._id || professor.id} value={professor._id || professor.id}>{professor.name}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Divider className="my-3" />
                
                {/* Rating Section */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <Form.Item
                      name="difficulty"
                      label={<span className="fw-bold"><StarFilled className="me-1" /> Difficulty</span>}
                      rules={[{ required: true, message: 'Please rate the difficulty' }]}
                    >
                      <Rate 
                        count={5} 
                        tooltips={['Very Easy', 'Easy', 'Moderate', 'Hard', 'Very Hard']}
                        className="custom-rate difficulty-rate"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      name="workload"
                      label={<span className="fw-bold"><FieldTimeOutlined className="me-1" /> Workload</span>}
                      rules={[{ required: true, message: 'Please rate the workload' }]}
                    >
                      <Rate 
                        count={5} 
                        tooltips={['Very Light', 'Light', 'Average', 'Heavy', 'Very Heavy']}
                        className="custom-rate workload-rate"
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Class Details */}
                <div className="row">
                  <div className="col-md-6">
                    <Form.Item
                      name="attendance"
                      label={<span className="fw-bold">Attendance Required?</span>}
                      valuePropName="checked"
                    >
                      <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      name="grade"
                      label={<span className="fw-bold"><TrophyOutlined className="me-1" /> Your Grade</span>}
                    >
                      <Select>
                        {grades.map(grade => (
                          <Option key={grade} value={grade}>{grade}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* Term & Year */}
                <div className="row">
                  <div className="col-md-6">
                    <Form.Item
                      name="term"
                      label={<span className="fw-bold"><CalendarOutlined className="me-1" /> Term</span>}
                      rules={[{ required: true, message: 'Please select a term' }]}
                    >
                      <Select>
                        <Option value="Fall">Fall</Option>
                        <Option value="Spring">Spring</Option>
                        {/* <Option value="Summer">Summer</Option>
                        <Option value="Winter">Winter</Option> */}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      name="year"
                      label={<span className="fw-bold">Year</span>}
                      rules={[{ required: true, message: 'Please select a year' }]}
                    >
                      <Select>
                        {yearOptions.map(year => (
                          <Option key={year} value={year}>{year}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <Divider className="my-3" />
                
                {/* Comment */}
                <Form.Item
                  name="comment"
                  label={<span className="fw-bold">Your Review</span>}
                >
                  <TextArea
                    rows={4}
                    placeholder="Share your experience, tips for success, and advice for future students..."
                    maxLength={1000}
                    showCount
                  />
                </Form.Item>

                {/* Action Buttons */}
                <div className="row mt-4">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <Button 
                      block 
                      onClick={togglePage}
                      size="large"
                      className="btn-secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="col-md-6">
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      loading={loading}
                      className="btn-success"
                    >
                      Submit Review
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
            
            <div className="card-footer bg-light py-3 text-center">
              <small className="text-muted">
                Your honest feedback helps other students make informed decisions.
                <br />
                Copyright © 2025 <span className="text-primary fw-bold">Rate_My_Classes_GB</span>. All Rights Reserved.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}