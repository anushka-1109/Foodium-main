import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import React, {useEffect} from 'react';
import { createBrowserHistory } from "history";
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';

import FeedbackPage from './messPages/FeedbackPage';
import LiveMenuPage from './messPages/LiveMenuPage';
import MessPayPage from "./messPages/MessPayPage";
import InspectionPage from "./messPages/InspectionPage";
import Hashcomp from "./components/hashcomp"
import Authenticate from "./components/authenticate";
import SuccessPage from "./messPages/SuccessPage";
import MessHome from "./messPages/MessHome";
import LiveReviewPage from "./messPages/LiveReviewPage";
import PaymentHistoryPage from "./messPages/PaymentHistoryPage";
import MasterMenuPage from "./messPages/MasterMenuPage";
import DisplayAnnouncementPage from "./pages/DisplayAnnouncementPage"

import CanteenPaymentHistoryPage from "./canteenPages/CanteenPaymentHistoryPage";

import MessVendorHomePage from './messVendorPages/MessVendorHomePage'
import ChangePinPage from './messVendorPages/ChangePinPage';
import ChangePricePage from './messVendorPages/ChangePricePage';
import ChangeMenuPage from "./messVendorPages/ChangeMenuPage";
import PostAnnouncementPage from "./pages/postAnnouncementPage";

import CanteenHomePage from "./canteenPages/CanteenHomePage";
import CanteenMenuPage from "./canteenPages/CanteenMenuPage";
import CanteenMenuChoice from "./canteenPages/CanteenMenuChoice";
import CanteenPayPage from "./canteenPages/CanteenPayPage";
import CanteenOrderPage from './canteenPages/CanteenOrderPage';
import CanteenInspectionPage from "./canteenPages/CanteenInspectionPage";

import CanteenVendorHomePage from "./canteenVendorPages/CanteenVendorHomePage";
import ChangeCanteenMenuPage from "./canteenVendorPages/CanteenChangeMenuPage";
import VendorOrderPage from './canteenVendorPages/VendorOrderPage';
let generator = require('string-generator-js');
const customHistory = createBrowserHistory();
function App() {
  function gettoken() {
    const hash = generator.generate()
    window.localStorage.setItem('hash', hash)
  }
  useEffect(()=> {
    gettoken()
  }, [])
  return (
    <BrowserRouter history={customHistory}>
      <Routes>
        <Route path='/' element={<EntryPage/>}/>
        <Route path='mess' element={<Authenticate position={[]}><Hashcomp><Outlet/></Hashcomp></Authenticate>}>
            <Route path='home' element={<Authenticate position={[]}>
              <Hashcomp>
                <MessHome/>
              </Hashcomp>
            </Authenticate>}/>
            <Route path='feedback' element={(<Authenticate  position={[]}>
                                              <Hashcomp>
                                                <FeedbackPage/>
                                              </Hashcomp>
                                            </Authenticate>)} />
            <Route path='mess-pay' element={<Authenticate  position={[]}>
          <Hashcomp>
            <MessPayPage/>
          </Hashcomp>
        </Authenticate>}/>
        <Route path='mess-master' element={<Authenticate  position={[]}>
          <Hashcomp>
            <MasterMenuPage/>
          </Hashcomp>
        </Authenticate>}/>
        <Route path='live-menu' element={<Authenticate  position={[]}>
                                            <Hashcomp>
                                              <LiveMenuPage/>
                                            </Hashcomp>
                                          </Authenticate>} /> 
        <Route path='live-review' element={<Authenticate  position={[]}>
            <Hashcomp>
              <LiveReviewPage/>
            </Hashcomp>
          </Authenticate>} />
        <Route path='inspection' element={<Authenticate  position={['Mess Inspector', 'Student']}>
                                            <Hashcomp>
                                              <InspectionPage/>
                                            </Hashcomp>
                                          </Authenticate>} />
        <Route path='payment-history' element={<Authenticate position={[]}>
                <Hashcomp>
                  <PaymentHistoryPage/>
                </Hashcomp>
              </Authenticate>} />

        <Route path='display-announcement' element={<Authenticate  position={[]}>
                                            <Hashcomp>
                                              <DisplayAnnouncementPage/>
                                            </Hashcomp>
                                          </Authenticate>}/>
        
        <Route path='success' element={<Authenticate  position={[]}>
                                          <Hashcomp>
                                            <SuccessPage/>
                                          </Hashcomp>
                                        </Authenticate>} />                          
            <Route path="*" element={
                (<main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>)
              }
            />
        </Route>
        <Route path='canteen' element={<Authenticate position={[]}><Hashcomp><Outlet/></Hashcomp></Authenticate>}>
          <Route path='home' element={<Authenticate position={[]}>
                <Hashcomp>
                  <CanteenHomePage/>
                </Hashcomp>   
              </Authenticate>}/>
          <Route path='orders' element={<Authenticate position={[]}>
                <Hashcomp>
                  <CanteenOrderPage/>
                </Hashcomp>   
              </Authenticate>}/>
          <Route path='display-announcement' element={<Authenticate  position={[]}>
                                        <Hashcomp>
                                          <DisplayAnnouncementPage/>
                                        </Hashcomp>
                                      </Authenticate>}/>
          <Route path='payment-history' element={<Authenticate position={[]}>
            <Hashcomp>
              <CanteenPaymentHistoryPage/>
            </Hashcomp>
          </Authenticate>} />
          <Route path='menu' element={<Authenticate position={[]}>
            <Hashcomp>
              <Outlet/>
            </Hashcomp>
          </Authenticate>} >
                      <Route path='choose' element={<Authenticate position={[]}>
                          <Hashcomp>
                          <CanteenMenuChoice/>
                          </Hashcomp>
                        </Authenticate>} />
                        <Route path=':canteenname' element={<Authenticate position={[]}>
                          <Hashcomp>
                            <CanteenMenuPage/>
                          </Hashcomp>
                        </Authenticate>} />
            </Route>
          <Route path='canteen-pay' element={<Authenticate position={[]}>
                                                <Hashcomp>
                                                  <CanteenPayPage/>
                                                </Hashcomp>
                                              </Authenticate>}/>
          <Route path='inspection' element={<Authenticate position={['Canteen Inspector', 'Student']}>
                                                <Hashcomp>
                                                  <CanteenInspectionPage/>
                                                </Hashcomp>
                                              </Authenticate>}/>
          </Route>
        <Route path='mess-vendor' element={<Authenticate position={[]}><Hashcomp><Outlet/></Hashcomp></Authenticate>}>
              <Route path='home' element={<Authenticate position={[]}>
                                            <Hashcomp>
                                              <MessVendorHomePage/>
                                            </Hashcomp>
                                          </Authenticate>}/>
              <Route path='change-pin' element={<Authenticate  position={[]}>
                                                  <Hashcomp>
                                                    <ChangePinPage position={''}/>
                                                  </Hashcomp>
                                                </Authenticate>}/>
              <Route path='change-price' element={<Authenticate  position={[]}>
                                                  <Hashcomp>
                                                    <ChangePricePage position={''}/>
                                                  </Hashcomp>
                                                </Authenticate>}/>
              <Route path='change-menu' element={<Authenticate  position={[]}>
                                                  <Hashcomp>
                                                    <ChangeMenuPage position={''}/>
                                                  </Hashcomp>
                                                </Authenticate>}/>
              <Route path='post-announcement' element={<Authenticate  position={[]}>
                                                  <Hashcomp>
                                                    <PostAnnouncementPage position={''}/>
                                                  </Hashcomp>
                                                </Authenticate>}/>
              <Route path="*" element={<main style={{ padding: "1rem" }}>
                                          <p>There's nothing here in Mess Vendors!</p>
                                        </main>}/>
        </Route>
        <Route path='canteen-vendor' >
              <Route path='home' element={<Authenticate position={[]}>
                                            <Hashcomp>
                                              <CanteenVendorHomePage/>
                                            </Hashcomp>
                                          </Authenticate>}/>
              <Route path='orders' element={<Authenticate position={[]}>
                                            <Hashcomp>
                                              <VendorOrderPage/>
                                            </Hashcomp>
                                          </Authenticate>}/>
              <Route path='post-announcement' element={<Authenticate  position={[]}>
                      <Hashcomp>
                        <PostAnnouncementPage position={''}/>
                      </Hashcomp>
                    </Authenticate>}/>

              <Route path='change-pin' element={<Authenticate  position={[]}>
                                                  <Hashcomp>
                                                    <ChangePinPage position={''}/>
                                                  </Hashcomp>
                                                </Authenticate>}/>
              <Route path='change-price' element={<Authenticate  position={[]}>
                                                  <Hashcomp>
                                                    <ChangePricePage position={''}/>
                                                  </Hashcomp>
                                                </Authenticate>}/>
              <Route path='change-menu' element={<Authenticate  position={[]}>
                                                  <Hashcomp>
                                                    <ChangeCanteenMenuPage position={''}/>
                                                  </Hashcomp>
                                                </Authenticate>}/>
              <Route path="*" element={<main style={{ padding: "1rem" }}>
                                          <p>There's nothing here in Mess Vendors!</p>
                                        </main>}/>
        </Route>
        <Route path='home' element={<Authenticate  position={[]}>
                                      <Hashcomp>
                                        <HomePage position={''}/>
                                      </Hashcomp>
                                    </Authenticate>}/>
      <Route path="*" element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here At All!</p>
        </main>
      }
    />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
