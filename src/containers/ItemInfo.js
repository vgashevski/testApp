import React from 'react';
import { connect } from 'react-redux';
import { campervanActions } from '../actions'
import { LoadingOutlined } from '@ant-design/icons';
import {
  withRouter
} from "react-router-dom";
import {
  Button,
  Spin,
  Layout,
  Row,
  Col,
  Divider,
  Input,
  Empty,
} from "antd";
const {Content } = Layout;



class ItemInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
    };
    this.getItemById = this.getItemById.bind(this);

    // this.qParams = new URLSearchParams(window.location.search);
    this.history = this.props.history;
    this.qParams = new URLSearchParams(this.history.location.search);
    console.log('this.history.location.search: ', this.history.location.search)

  }
  componentDidMount() {
    const id = this.qParams.get('selected-item');
    if (id) {
      const item = this.getItemById(id);
      if (item) {
        this.setState({item})
        console.log('item: ', item)
      }

    }
  }

  getItemById(id) {
    return this.props.data.find((item) => item.id === id);
  }

  render() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    const { item } = this.state;
    return (
    <div>
      <Layout className="layout">
        <Content>
          {
            item
            ?  <Row gutter={[16]}>
                  <Col  xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className="imgInfoWrapper">
                      <img className="imgInfo" src={item.attributes.primary_image_url} alt="Picture is not available"/>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div>{item.attributes.display_vehicle_type} - {item.attributes.location.city}, {item.attributes.location.country}</div>
                    <div className="previewItemName">{item.attributes.name}</div>
                  </Col>
                </Row>
                : <Empty />
          }

        </Content>
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
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(ItemInfo));
