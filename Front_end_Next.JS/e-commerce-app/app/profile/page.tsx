import AddressFormContainer from '@/components/order/AddressFormContainer';
import OrderContainer from '@/components/order/OrderContainer';
import WishlistSection from '@/components/order/WishlistSection';
import React from 'react'

const ProfilePage = () => {
  return (
    <>
      <div className="main-max-width padding-x py-6 flex-center mx-auto">
        {/* <Button className="address-btn">Add Shipping Address</Button> */}
        <AddressFormContainer />
      </div>
      <OrderContainer />
      <WishlistSection />
    </>
  );
};

export default ProfilePage;