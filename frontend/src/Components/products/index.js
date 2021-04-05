import React, { useEffect } from 'react';
import CustomizedTables from './Table';
import {
  getMyProduct,
  getMyProductsList,
  ProductDelete,
} from '../../Reducer/ProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import { createProductdata } from '../../Reducer/ProductSlice';

const MyProduct = () => {
  const dispatch = useDispatch();

  const newProduct = useSelector(createProductdata);
  const { success } = newProduct;

  const productDelete = useSelector(ProductDelete);
  const { success: successDelete, loading: deleteLoading } = productDelete;

  const data = useSelector(getMyProductsList);
  const { list, loading, error } = data;

  useEffect(() => {
    dispatch(getMyProduct());
  }, [success, successDelete, dispatch]);

  if (loading || deleteLoading) {
    return <Loader />;
  }
  return (
    <div
      style={{
        width: '80%',
        margin: '0 auto',
        marginTop: '100px',
        marginBottom: '100px',
      }}
    >
      {error && !list.length ? (
        <p
          style={{
            color: 'white',
            margin: '10px',
            background: 'red',
            padding: '15px 10px',
            borderRadius: '5px',
          }}
        >
          {error}
        </p>
      ) : (
        <CustomizedTables list={list && list} />
      )}
    </div>
  );
};

export default MyProduct;
