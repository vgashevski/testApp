import React from 'react';
import { connect } from 'react-redux';
import { campervanActions } from '../actions'
import { LoadingOutlined } from '@ant-design/icons';
import {
  DEFAULT_RESPONSE_LIMIT,
  DEFAULT_RESPONSE_OFFSET,
} from "../constants/appConstants";
import {
  Button,
  Spin,
  Layout,
  Row,
  Col,
  Divider,
} from "antd";
const { Header, Footer, Content } = Layout;

let styles = {
  backgroundColor: 'HotPink',
  width: '250px',
  height: '100px',
  borderRadius: '100px',
  display: 'block',
  margin: '50px auto',
  fontSize: '25px',
  border: '3px solid '
};



class ListCampervans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadMore = this.loadMore.bind(this);
    this.qParams = new URLSearchParams(window.location.search);
    // console.log('window.location: ', window.location)
    // console.log('window.location.search: ', window.location.search)
    console.log('qParams: ', this.qParams)
    for (let p of this.qParams) {
      console.log('Query param: ', p);
    }
    this.limit = this.qParams.get("limit") ||  DEFAULT_RESPONSE_LIMIT;
    this.limit = parseInt(this.limit);
    this.offset = this.qParams.get("offset") || DEFAULT_RESPONSE_OFFSET;
    this.offset = parseInt(this.offset);
    console.log('this.limit: ', this.limit);
    console.log('this.offset: ', this.offset);
    // this.qParams = new URLSearchParams(window.location.search);
  }
  componentDidMount() {
    console.log('this.props: ', this.props);
    this.props.getCampervans({limit:this.limit, offset: this.offset});
  }

  renderSearch() {

  }

  loadMore() {
    if (this.props.total === this.props.data.length) {
      console.log('Total number of result has reached: ', this.props.total === this.props.data.length)
      return;
    }
    this.offset += this.limit;
    console.log('this.offset: ', this.offset)
    this.props.getCampervans({limit:this.limit, offset: this.offset});

  }

  renderItems() {
    const style = { background: '#0092ff', padding: '8px 0' };
    if (!this.props.data || !this.props.data.length) {
      console.log('this.data: ', this.data)
      return
    }
    let counter = 0;
    const res = this.props.data.map((item)=>{
    counter += 1;
      const alreadyExists = this.props.data.find((i)=>i.id===item.id)
      if (alreadyExists) {
        console.log('alreadyExists: ', alreadyExists)
        console.log('duplicated item: ', item)
      }
      return(
          <Col className="gutter-row" key={`${item.id}_${Date.now()}_${counter}`} span={12} xs={24} sm={24} md={12} lg={12} xl={12} >
            <Row gutter={[16]}>
              <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className="imgPreviewWrapper">
                  <img className="imgPreview" src={item.attributes.primary_image_url} alt="Picture is not available"/>
                </div>
              </Col>
              <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
                <div>{item.attributes.display_vehicle_type} - {item.attributes.location.city}, {item.attributes.location.country}</div>
                <div className="previewItemName">{item.attributes.name}</div>
              </Col>
            </Row>
          </Col>
      )
    })
    return(
      <div>
        <Divider orientation="left"></Divider>
        <Row gutter={[16, 24]}>
          {res}
        </Row>
      </div>
    )
  }

  render() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    console.log('this.props.loading: ',this.props.loading)
    return (
    <div>
      <Layout className="layout">
        <Content>
          <h1>Campervans</h1>
          {this.renderItems()}
        </Content>
        <Footer>
          <Button loading={this.props.loading}  type="primary" onClick={this.loadMore}>Load more</Button>
        </Footer>
      </Layout>
    </div>
    );
  }

};

const mapDispatchToProps = {
  getCampervans: (params) => campervanActions.getCampervans(params),
};
const mapStateToProps = ({ campervan }) => {
  return {
    loading: campervan.loading,
    data: campervan.campervanList,
    total: campervan.total,
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListCampervans);;
