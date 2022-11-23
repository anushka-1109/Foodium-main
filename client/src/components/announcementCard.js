import { Card } from 'antd';

const announcementCard = (props) => {
  return (
    <Card size="small" title={props.title} style={{ width: props.width }}>
      <p>{props.description}</p>
    </Card>
  );
}

export default announcementCard