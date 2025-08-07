import { Route, Routes } from 'react-router-dom';
import RequireAuthentication from './routes/RequireAuthentication';
import PageNotFound from './routes/PageNotFound';
import Login from './components/login/Login';
import RequireValidation from './routes/RequiredValidation';
import ConnectorsList from './components/connectors/ConnectorsList';
import SignUp from './components/sign/SignUp';
import Verify from './components/sign/Verify';
import ForgetPassword from './components/login/ForgetPassword';
import ResetPassword from './components/login/ResetPassword';
import ProfileDetails from './components/profile/profileDetails/ProfileDetails';
import InvoiceDetails from './components/profile/invoiceDetails/InvoiceDetails';
import AddConnector from './components/connectors/AddConnector';
import ConnectorDetails from './components/connectors/ConnectorDetails';
import Guide from './components/connectors/Guide';
import EditConnector from './components/connectors/EditConnector';
import EditInvoice from './components/profile/invoiceDetails/EditInvoice';
import EditProfile from './components/profile/profileDetails/EditProfile';
import CreditsList from './components/credits/CreditsList';
import InvoicesList from './components/invoices/InvoicesList';
import SuccessfulPayment from './components/credits/payment/SuccessfulPayment';
import FailedPayment from './components/credits/payment/FailedPayment';
import RequiredAuthorization from './routes/RequiredAuthorization';
import OffersList from './components/offers/OffersList';
import EditOffer from './components/offers/EditOffer';
import AddOffer from './components/offers/AddOffer';

function App() {
  return (
    <div>
        <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path='/sign' element={<SignUp/>}/>
          <Route path ='/verify' element={<RequireValidation/>}>
              <Route path='verify/validate' element={<Verify/>}/>
              <Route path='verify/resetPassword' element={<ResetPassword/>}/>         
          </Route>
          <Route element={<RequireAuthentication/>}>
            <Route path='/' element={<ConnectorsList/>}/>
            <Route path='/addConnector' element={<AddConnector/>}/>
            <Route path='/connectorDetails/:id' element={<ConnectorDetails/>}/>
            <Route path='/editConnector/:id' element={<EditConnector/>}/>
            <Route path='/guide' element={<Guide exportGuide={false} />}/>
            <Route path='/profileDetails' element={<ProfileDetails/>}/>
            <Route path='/EditProfileDetails' element={<EditProfile/>}/>
            <Route path='/invoiceDetails' element={<InvoiceDetails/>}/>
            <Route path='/EditInvoiceDetails' element={<EditInvoice/>}/>
            <Route path='/credit' element={<CreditsList/>}/>
            <Route path='/successfulPayment' element={<SuccessfulPayment/>}/>
            <Route path='/failedPayment' element={<FailedPayment/>}/>
            <Route path='/invoices' element={<InvoicesList/>}/>
            <Route element={<RequiredAuthorization/>}>
                 <Route path='/offers' element={<OffersList/>}/>
                 <Route path='/editOffer/:id' element={<EditOffer/>}/>
                 <Route path='/addOffer' element={<AddOffer/>}/>
            </Route>
            <Route path='*' element={<PageNotFound/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App;
