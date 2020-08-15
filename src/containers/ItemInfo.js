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
  Empty, Divider,
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

  getPrice(item) {
    const currencySymbols = {
      'USD': '$', // US Dollar
      'EUR': '€', // Euro
      'CRC': '₡', // Costa Rican Colón
      'GBP': '£', // British Pound Sterling
      'ILS': '₪', // Israeli New Sheqel
      'INR': '₹', // Indian Rupee
      'JPY': '¥', // Japanese Yen
      'KRW': '₩', // South Korean Won
      'NGN': '₦', // Nigerian Naira
      'PHP': '₱', // Philippine Peso
      'PLN': 'zł', // Polish Zloty
      'PYG': '₲', // Paraguayan Guarani
      'THB': '฿', // Thai Baht
      'UAH': '₴', // Ukrainian Hryvnia
      'VND': '₫', // Vietnamese Dong
    };
    const currencyName = item.attributes.presentment_currency;
    let cSymbol = '';
    if (currencySymbols[currencyName]!==undefined) {
      cSymbol = currencySymbols[currencyName]
    }
    const priceInUnit = parseInt(item.attributes.price_per_day) / 100;

    return `${cSymbol}${priceInUnit}`
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
            ?  <div><Row gutter={[16]}>
                  <Col  xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className="imgInfoWrapper">
                      <img className="imgInfo" src={this.findImgUrl(item, 'images')} alt="Picture is not available"/>
                    </div>
                  </Col>
                </Row>
                  <Divider orientation="left"></Divider>
                <Row gutter={[16, 40]}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Row>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <div>{item.data.attributes.display_vehicle_type} - {item.data.attributes.location.city}, {item.data.attributes.location.country}</div>
                        <div className="previewItemName">{item.data.attributes.name}</div>
                      </Col>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <span className="greenPrice">{this.getPrice(item.data)}</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                </div>
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
