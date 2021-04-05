import React, { useEffect, useState } from 'react';
import style from './sell.module.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import {
  createProduct,
  createProductdata,
  getCategory,
  getCategoryList,
} from '../../Reducer/ProductSlice';
import axios from 'axios';

const ProductSellForm = () => {
  const dispatch = useDispatch();
  const data = useSelector(createProductdata);
  const { success, loading } = data;

  const Categorydata = useSelector(getCategoryList);
  const { list, loading: categoryLoading } = Categorydata;
  const [Category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState(false);
  const [customCategoryValue, setCustomCategoryValue] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [Province, setProvince] = useState('');
  const [City, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [featured, setFeatured] = useState(false);

  const [Detail, setDetail] = useState({
    Make: '',
    Condition: '',
    type: '',
  });
  const [images, setImages] = useState({
    imgfrontside: '',
    imgleftside: '',
    imgrightside: '',
    imgbackside: '',
  });

  const [discription, setDiscription] = useState('');

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        config
      );
      return await data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    const formdata = {
      Category: customCategory ? customCategoryValue : Category,
      productName,
      productPrice,
      Province,
      City,
      area,
      address,
      featured,
      Make: Detail.Make,
      Condition: Detail.Condition,
      type: Detail.type,
      imgfrontside: images.imgfrontside,
      imgleftside: images.imgleftside,
      imgrightside: images.imgrightside,
      imgbackside: images.imgbackside,
      discription,
    };
    console.log('formdata', formdata);
    dispatch(createProduct(formdata));
    // console.log('inState =====>', data);
    setCategory('');
    setAddress('');
    setArea('');
    setCustomCategoryValue('');
    setProductPrice('');
    setProvince('');
    setImages({
      imgfrontside: '',
      imgleftside: '',
      imgrightside: '',
      imgbackside: '',
    });
    setImages('');
    setFeatured(false);
    setCustomCategory('');
    setDetail({
      Make: '',
      Condition: '',
      type: '',
    });
    setProductName('');
    setDiscription('');
    setCity('');
    e.target.reset();
  };

  const HandleDetails = (event) => {
    const name = event.target.name;
    setDetail({
      ...Detail,
      [name]: event.target.value,
    });
  };

  const HandleImages = async (event) => {
    const name = event.target.name;
    setImages({
      ...images,
      [name]: await uploadHandler(event),
    });
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [success]);
  return (
    <div className={style.siginContainer}>
      <h2 className={style.heading}>Product Sell</h2>
      {success && (
        <p
          style={{
            color: 'blue',
            margin: '10px',
            background: 'lightblue',
            padding: '15px 10px',
            borderRadius: '5px',
          }}
        >
          {success}
        </p>
      )}

      <br />
      <form onSubmit={SubmitHandler}>
        <div className={style.fieldsContainer}>
          <FormControl variant='outlined' required className={style.inputField}>
            <InputLabel htmlFor='outlined-category-native-simple'>
              Category
            </InputLabel>
            <Select
              native
              value={Category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (e.target.value === 'other') {
                  setCustomCategory(true);
                } else {
                  setCustomCategory(false);
                }
              }}
              label='Category'
              inputProps={{
                name: 'category',
                id: 'outlined-category-native-simple',
              }}
            >
              <option aria-label='None' value='' />
              {list &&
                list?.map((v, ind) => (
                  <option key={ind} value={v}>
                    {v}
                  </option>
                ))}
              <option value='other'>other</option>
            </Select>
          </FormControl>
          {customCategory && (
            <TextField
              id='outlined-basic'
              label='Custom Category'
              variant='outlined'
              required
              value={customCategoryValue}
              onChange={(e) => setCustomCategoryValue(e.target.value)}
              className={style.inputField}
            />
          )}

          <TextField
            id='outlined-basic'
            label='Product Name'
            variant='outlined'
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={style.inputField}
          />
          <TextField
            id='outlined-basic'
            label='Product Price'
            variant='outlined'
            required
            type='number'
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className={style.inputField}
          />
        </div>
        <div className={style.fieldsContainer}>
          <TextField
            id='outlined-basic'
            label='Province'
            variant='outlined'
            required
            value={Province}
            onChange={(e) => setProvince(e.target.value)}
            className={style.inputField}
          />
          <TextField
            id='outlined-basic'
            label='City'
            variant='outlined'
            required
            value={City}
            onChange={(e) => setCity(e.target.value)}
            className={style.inputField}
          />
          <TextField
            id='outlined-basic'
            label='Area'
            variant='outlined'
            required
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={style.inputField}
          />
        </div>
        <div className={style.fieldsContainer}>
          <TextField
            id='outlined-basic'
            label='Address'
            variant='outlined'
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={style.inputField}
          />
        </div>
        <h4 className={style.subTitle}>Details</h4>
        <div className={style.fieldsContainer}>
          <TextField
            id='outlined-basic'
            label='Make'
            variant='outlined'
            value={Detail.Make}
            name='Make'
            onChange={HandleDetails}
            className={style.inputField}
          />
          <TextField
            id='outlined-basic'
            label='Type'
            variant='outlined'
            value={Detail.type}
            name='type'
            onChange={HandleDetails}
            className={style.inputField}
          />
          <TextField
            id='outlined-basic'
            label='Condition'
            variant='outlined'
            value={Detail.Condition}
            name='Condition'
            onChange={HandleDetails}
            className={style.inputField}
          />

          <FormControlLabel
            control={
              <Radio
                color='primary'
                checked={featured}
                onClick={(e) => {
                  setFeatured(!featured);
                }}
              />
            }
            label='Feature'
          />
        </div>
        <h4 className={style.subTitle}>Images</h4>
        <div className={style.fieldsContainerImage}>
          <div className={style.inputFieldImage}>
            <label className={style.imageLabel} for='imgfrontside'>
              Front
            </label>
            <input
              name='imgfrontside'
              onChange={HandleImages}
              required
              type='file'
            />
          </div>
          <div className={style.inputFieldImage}>
            <label className={style.imageLabel} for='imgleftside'>
              Left
            </label>
            <input
              name='imgleftside'
              onChange={HandleImages}
              required
              type='file'
            />
          </div>
        </div>

        <div className={style.fieldsContainerImage}>
          <div className={style.inputFieldImage}>
            <label className={style.imageLabel} for='imgrightside'>
              Right
            </label>
            <input
              name='imgrightside'
              onChange={HandleImages}
              required
              type='file'
            />
          </div>
          <div className={style.inputFieldImage}>
            <label className={style.imageLabel} for='imgbackside'>
              Back
            </label>
            <input
              name='imgbackside'
              onChange={HandleImages}
              required
              type='file'
            />
          </div>
        </div>

        <div className={style.fieldsContainer}>
          <TextareaAutosize
            aria-label='minimum height'
            rowsMin={5}
            placeholder='Descritpion ...'
            className={style.textArea}
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
        </div>

        <br />
        <br />
        <Button
          variant='contained'
          color='primary'
          style={{ width: '100%', padding: '10px' }}
          type={loading ? 'button' : 'submit'}
        >
          {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default ProductSellForm;
