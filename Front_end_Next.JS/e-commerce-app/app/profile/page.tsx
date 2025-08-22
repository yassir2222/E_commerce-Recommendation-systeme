import AddressForm from '@/components/order/AddressForm';
import AddressFormContainer from '@/components/order/AddressFormContainer';
import MiniProductCard from '@/components/order/MiniProductCard'
import OrderContainer from '@/components/order/OrderContainer';
import PurchasedOrder from '@/components/order/PurchsedOrder'
import WishlistSection from '@/components/order/WishlistSection';
import Button from '@/components/uiComponents/Button';
import Modal from '@/components/uiComponents/Modal';
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