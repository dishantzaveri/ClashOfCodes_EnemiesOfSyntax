import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
const array = [
  "Shipped",
  "Ordered",
  "Required"
]
const typeA = [
  "Chemical",
  "Other",
  "Equipment",
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#233329",
    color: theme.palette.common.white,
    fontSize: 20,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, name, quantity, price) {
  return {
    id,
    name,
    quantity,
    type: typeA[Math.floor(Math.random() * typeA.length)],
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
    status: array[Math.floor(Math.random() * array.length)]

  };
}





function Row(props) {
  const { row, setRows, rows } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.quantity}</StyledTableCell>
        <StyledTableCell align="right">{row.type}</StyledTableCell>
        <StyledTableCell align="right">{row.price}</StyledTableCell>
        <StyledTableCell align="right">

          {row.status === "Shipped" ?
            <Button color='success'>{row.status}</Button>
            :
            row.status === "Ordered" ?
              <Button color='warning'>{row.status}</Button>
              :
              <Button color='error'>{row.status}</Button>
          }
        </StyledTableCell>
        <StyledTableCell align="right"><Button size='small' color='error' variant='contained' onClick={(e) => {
          // var axios = require('axios');

          // var config = {
          //   method: 'delete',
          //   url: `https://dummyjson.com/products/${row.id}`,
          //   headers: {}
          // };

          // axios(config)
          //   .then(function (response) {
          //     console.log(JSON.stringify(response.data));

          //     Swal.fire({
          //       position: 'top-end',
          //       icon: 'success',
          //       title: 'Data is deleted',
          //       showConfirmButton: false,
          //       timer: 1500
          //     })
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          let array = rows.filter(item => item.id !== row.id)
          setRows(array)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Data is deleted',
            showConfirmButton: false,
            timer: 1500
          })
        }}><DeleteForeverIcon /></Button></StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead >
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export const EnhancedTable = ({ type,checked, rows, setRows }) => {
  console.log(rows)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [items, setItems] = React.useState({
    name: "",
    price: "",
    quantity: "",
  });

  // const rows = [];
  // console.log(d.length);
  // if (d.length !== 0) {
  //   for (let i = 0; i < 20; i++) {
  //     rows.push(createData(d[i].id, d[i].title, d[i].stock, d[i].price));
  //   }
  // }
  const handleChanges = (event) => {
    setItems({
      ...items,
      [event.target.name]: event.target.value,
    });
    console.log(items);
  };
  // res.data.products.map((e) => {
  // return setRows(prevSelected => [...prevSelected, createData(e.title, e.stock, e.price)])
  //  rows.push(createData(e.title, e.stock, e.price))
  // })
  return (
    <TableContainer sx={{ maxHeight: 540 }} component={Paper}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead >
          <TableRow >
            <StyledTableCell><Button color='success' size='large' onClick={handleClickOpen} variant='contained'>ADD</Button></StyledTableCell>
            <StyledTableCell align='center' >Item</StyledTableCell>
            <StyledTableCell align="right" >Quantity</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Price($)</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Inventory</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add the Details :
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name='name'
                label="Item name"
                type="text"
                color='success'
                fullWidth
                onChange={handleChanges}
                variant="standard"
                value={items.name}
              />
              <TextField
                margin="dense"
                id="price"
                color='success'
                name='price'
                onChange={handleChanges}
                value={items.price}
                label="Price"
                type="text"
                variant="standard"
              />
              &nbsp;
              &nbsp;
              <TextField
                margin="dense"
                color='success'
                onChange={handleChanges}
                id="quantity"
                name='quantity'
                value={items.quantity}
                label="Quantity"
                type="text"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button color='error' onClick={handleClose}>Cancel</Button>
              <Button color='success' onClick={() => {

                setRows(prevState => [...prevState, createData(0, items.name, items.price, items.quantity)]);
                setOpen(false);
                Swal.fire(
                  "Added Successfully at the end"
                )
              }}>Submit</Button>
            </DialogActions>
          </Dialog>
          {/* {d.map((e) => {
            var h = createData(e.title, e.stock, e.price)
            return <TableRow>
              <TableCell>{e.id}</TableCell>
              <TableCell >{h.name}</TableCell>
              <TableCell align="right">{h.quantity}</TableCell>
              <TableCell align="right">{h.type}</TableCell>
              <TableCell align="right">{h.price}</TableCell>
              <TableCell align="right">{h.status}</TableCell>
            </TableRow>
          })} */}
          {rows.map((row) => (
            type!=null?
            (row.type == type?
            <Row key={row.name} row={row} setRows={setRows} rows={rows} />
            :
            null)
            :
            <Row key={row.name} row={row} setRows={setRows} rows={rows} />
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}

// style={{
//   backgroundColor: "#63d471",
//   backgroundImage: "linear-gradient(315deg, #63d471 0%, #233329 74%)",
//   fontSize: '1.2rem', fontWeight: '600'
// }}
// style={{ backgroundColor: '#0275d8', fontSize: '1.2rem', fontWeight: '600' }}