import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setCloseModal, setOpenModal } from '../redux/modal/modalSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
              {massgae}
            </Typography>
          </Box>
        </Modal>
    );
}
 
export default ModalMassgae;
  

