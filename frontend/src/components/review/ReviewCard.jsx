import { Tag, Avatar, Card, Row, Col, Button } from 'antd';
import { UserOutlined, CalendarOutlined, DeleteOutlined } from '@ant-design/icons';

export default function ReviewCard({ review, curUser, deleteReview, getRatingColor }) {
  const check = (curUser?.id === review.user);

  return (
    <Card 
      key={review.id} 
      className="mb-4 shadow-sm hover-effect border-0"
      hoverable
    >
      {/* Header */}
      <div className="review-header mb-3 pb-2 border-bottom">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <div className="d-flex align-items-center">
              <Avatar size="large" icon={<UserOutlined />} className="me-2" />
              <div>
                <div className="fw-bold">{review.professor}</div>
                <Tag color="blue">Grade: {review.grade}</Tag>
              </div>
            </div>
          </Col>

          <Col xs={12} md={8}>
            <div className="text-center">
              <div className="text-muted small mb-1">Difficulty</div>
              <div 
                style={{
                  backgroundColor: getRatingColor(review.difficulty),
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}
              >
                {review.difficulty}/5
              </div>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="text-center">
              <div className="text-muted small mb-1">Workload</div>
              <div 
                style={{
                  backgroundColor: getRatingColor(review.workload),
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}
              >
                {review.workload}/5
              </div>
            </div>
          </Col>

          <Col xs={24} md={4}>
            <div className="text-end">
              <div className="text-muted small mb-1">
                <CalendarOutlined className="me-1" />
                {review.term} {review.year}
              </div>
              <Tag color={review.attendance ? "red" : "green"}>
                Attendance: {review.attendance ? "Required" : "Optional"}
              </Tag>
            </div>
          </Col>
        </Row>
      </div>

      {/* Comment */}
      {review.comment && (
        <div className="review-comment mb-2">
          <p className="mb-0 fst-italic">{review.comment}</p>
        </div>
      )}

      <div className="d-flex justify-content-start mt-3 text-muted small">
        Posted on: {new Date(review.postBy).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </div>

      {/* Delete Button */}
      {check && (
        <div className="d-flex justify-content-end mt-3">
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => deleteReview(review.id)}
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
}
