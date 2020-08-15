import React from 'react';
import { connect } from 'react-redux';
import { campervanActions } from '../actions'

import {
  withRouter
} from "react-router-dom";
import {
  Spin,
  Layout,
  Row,
  Col,
  Empty,
} from "antd";
const {Content } = Layout;

class ItemInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
    };
    this.findImgUrl = this.findImgUrl.bind(this);
    this.history = this.props.history;
    this.qParams = new URLSearchParams(this.history.location.search);

  }
  componentDidMount() {
    const id = this.qParams.get('selected-item');
    if (id) {
      this.props.getRental({id});
    }
  }
  componentWillUnmount() {
    this.props.cleanUpSelected()
  }

  findImgUrl(item, type) {
    let url = '';
    const imgId = item.data.relationships.primary_image.data.id;
    const imgObj = item.included.find((i)=> i.type === type && i.id===imgId);
    if (imgObj) {
      url = imgObj.attributes.url
    }
    return url;
  }

  render() {
    const item  = this.props.selectedItemData;
    const loading  = this.props.loading;
    return (
    <div>
      <Layout className="layout">
        <Content>
          {
            item && item.data
            ?  <Row gutter={[16]}>
                  <Col  xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className="imgInfoWrapper">
                      <img className="imgInfo" src={this.findImgUrl(item, 'images')} alt="Picture is not available"/>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div>{item.data.attributes.display_vehicle_type} - {item.data.attributes.location.city}, {item.data.attributes.location.country}</div>
                    <div className="previewItemName">{item.data.attributes.name}</div>
                  </Col>
                </Row>
                : loading ? (
                  <div style={{textAlign: 'center'}} ><Spin/></div>
                  ) : <Empty />
          }
        </Content>
      </Layout>
    </div>
    );
  }

};

const mapDispatchToProps = {
  getCampervans: (params) => campervanActions.getCampervans(params),
  getRental: (params) => campervanActions.getRental(params),
  cleanUpSelected: () => campervanActions.cleanUpSelected(),
};
const mapStateToProps = ({ campervan }) => {
  return {
    loading: campervan.loading,
    data: campervan.campervanList,
    selectedItemData: campervan.selectedItemData,
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(ItemInfo));
