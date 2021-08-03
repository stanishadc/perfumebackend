import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OrdersList from './components/Orders/OrdersList';
import OrderDetails from './components/Orders/OrderDetails';
import ProductsList from './components/ProductsList';
import AddProduct from './components/AddProduct';
import PaymentsList from './components/Payments/PaymentsList';
import CustomersList from './components/CustomersList';
import CollectionList from './components/CollectionList';
import CategoryList from './components/CategoryList';
import Dashboard from './components/Dashboard';
import BrandsList from './components/BrandsList';
import UserDetails from './components/Users/UserDetails';
import UsersList from './components/Users/UsersList';
import Home from './components/Home';
import { ProtectedRoute } from './ProtectedRoute';
import { DeliveryRoute } from './DeliveryRoute';
import { createBrowserHistory } from "history";
import Bottles from './components/Bottles';
import CustomerOrders from './components/CustomerOrders';
import HomeSlider from './components/HomeSlider';
import ProductImages from './components/ProductImages';
import PerfumesList from './components/PerfumesList';
import PerfumeDetails from './components/PerfumeDetails';
import SubscribersList from './components/SubscribersList';
import AboutUs from './components/Masters/AboutUs';
import PrivacyPolicy from './components/Masters/PrivacyPolicy';
import TermsAndConditions from './components/Masters/TermsAndConditions';
import ContactUs from './components/Masters/ContactUs';
import Dispatchlist from './components/Orders/ShippedOrders';
import DispatchDetails from './components/Orders/DispatchDetails';
import DeliveredOrders from './components/Orders/DeliveredOrders';
import DeliveryDetails from './components/Orders/DeliveryDetails';

export const history = createBrowserHistory();
export default class App extends Component {
  render() {
    return (
      <div>
            <Router history={history}>
          <Switch>
            <Route exact path='/' component={Home} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute path='/subscribers' component={SubscribersList} />
            <ProtectedRoute path='/category/categorylist' component={CategoryList} />
            <ProtectedRoute path='/collection/collectionlist' component={CollectionList} />
            <ProtectedRoute path='/perfumeslist' component={PerfumesList} />
            <ProtectedRoute path='/perfumedetails/:productId' component={PerfumeDetails} />
            <ProtectedRoute path='/addperfume' component={AddProduct} />
            <ProtectedRoute path='/products/productslist' component={ProductsList} />
            <ProtectedRoute path='/productimages/:productId' component={ProductImages} />
            <ProtectedRoute path='/product/addproduct' component={AddProduct} />
            <ProtectedRoute path='/brand/brandslist' component={BrandsList} />
            <ProtectedRoute path='/products/bottlesize' component={Bottles} />
            <ProtectedRoute path='/orders/orderslist' component={OrdersList} />
            <ProtectedRoute path='/orders/:orderNo' component={OrderDetails} />
            <ProtectedRoute path='/payments/paymentslist' component={PaymentsList} />
            <ProtectedRoute path='/customers/customerslist' component={CustomersList} />
            <ProtectedRoute path='/users/adduser' component={UserDetails} />
            <ProtectedRoute path='/users/edit/:userId' component={UserDetails} />
            <ProtectedRoute path='/customers/customerslist' component={CustomersList} />
            <ProtectedRoute path='/customerorders/:customerId' component={CustomerOrders} />
            <ProtectedRoute path='/users/userlist' component={UsersList} />
            <ProtectedRoute path='/homeslider' component={HomeSlider} />
            <ProtectedRoute path='/aboutus' component={AboutUs} />
            <ProtectedRoute path='/privacypolicy' component={PrivacyPolicy} />
            <ProtectedRoute path='/termsandconditions' component={TermsAndConditions} />
            <ProtectedRoute path='/contactus' component={ContactUs} />
            <DeliveryRoute path='/dispatchlist' component={Dispatchlist} />
            <DeliveryRoute path='/dispatchdetails/:orderNo' component={DispatchDetails} />
            <DeliveryRoute path='/deliverylist' component={DeliveredOrders} />
            <DeliveryRoute path='/deliverydetails/:orderNo' component={DeliveryDetails} />
          </Switch>
        </Router>
      </div>
    );
  }
}
