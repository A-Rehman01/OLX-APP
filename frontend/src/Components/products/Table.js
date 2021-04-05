import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../Reducer/ProductSlice';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    textAlign: 'center',
  },
});

export default function CustomizedTables({ list }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <>
      {' '}
      {list ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell align='center'>Category</StyledTableCell>
                <StyledTableCell align='center'>Date</StyledTableCell>
                <StyledTableCell align='center'>Price</StyledTableCell>
                <StyledTableCell align='center'>Detail</StyledTableCell>
                <StyledTableCell align='center'>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component='th' scope='row'>
                      {row?.productName}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row?.Category}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <Moment format='YYYY-MM-DD'>{row?.date}</Moment>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.productPrice}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {' '}
                      <Link to={`/product/${row._id}`}>
                        <Button variant='contained' color='primary'>
                          Detail
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <Button
                        variant='contained'
                        onClick={() => deleteHandler(row._id)}
                        color='secondary'
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ''
      )}
    </>
  );
}
