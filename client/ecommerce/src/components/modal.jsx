import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setCloseModal, setOpenModal } from '../redux/modal/modalSlice';
import { Paper } from '@mui/material';
import { height } from '@mui/system';
import myImage from '../assets/nGsLogo2.png'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#e8eaf6',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

const ModalMassgae = () => {
  // const [open, setOpen] = React.useState(false);



  const dispatch = useDispatch()
  const open = useSelector(state => state.modal.openModal);
  const massgae = useSelector(state => state.modal.massgae);
  const handleClose = () => dispatch(setCloseModal());

  console.log(open)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Paper elevation={4}
        sx={{
          ...style,
          display: "flex",
          flexDirection: "column",
          maxHeight: 250,
          height: '100vh',
          width: { xs: 200, sm: 400 }
        }} >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box component="img" src={myImage} sx={{
            width: { xs: 60, md: 96 },
            objectFit: 'cover',
            mr: 2,
            borderRadius: '15px',
            textAlign: 'center'
          }} ></Box>
          <CloseSharpIcon onClick={handleClose} />

        </Box>

        <Typography id="modal-modal-title" variant="p" my={4}
          sx={{
            textAlign: 'center',
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto'
          }} >
          {massgae}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flexGrow: 1 }}>
          <Typography sx={{ fontSize: '10px', textAlign: 'center', backgroundColor: 'black', color: 'whitesmoke' }}>Be the first to know about new products, offers, and updates</Typography>
        </Box>
      </Paper>
    </Modal>
  );
}

export default ModalMassgae;


