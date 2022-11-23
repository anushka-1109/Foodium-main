import { Badge, Button, Switch, Divider, Avatar } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';

const ButtonGroup = Button.Group;



const counter=()=>{
const [count, setCount] = useState(0);
const [show, setShow] = useState(true);

let increase = () => {
    let newCount=count+1
    setCount(newCount)
};

let decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
        newCount = 0;
    }
    setCount(newCount)
};

return (
    <>
        <Badge count={count}>
        <Avatar shape="square" size="large" />
        </Badge>
        <ButtonGroup>
        <Button onClick={decline}>
            <MinusOutlined />
        </Button>
        <Button onClick={increase}>
            <PlusOutlined />
        </Button>
        {/* <Button onClick={this.random}>
            <QuestionOutlined />
        </Button> */}
        </ButtonGroup>
        <Divider />
        <Badge dot={show}>
        <Avatar shape="square" size="large" />
        </Badge>
        {/* <Switch onChange={this.onChange} checked={this.state.show} /> */}
    </>
    );
}
export default counter

