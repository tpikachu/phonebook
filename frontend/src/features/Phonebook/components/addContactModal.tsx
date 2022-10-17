import { useState, useMemo, useContext, useEffect } from "react";
import { Box, Button, Card, Typography, Modal, TextField } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { IContact } from "../../../types";
import { PhoneBookContext } from "../../../context/phoneBook";

const ModalActions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
}));

export interface IAddContactModalProps {
  open: boolean;
  onClose: () => void;
  onOk?: (contact: IContact) => void;
}

const AddContactModal = ({ open, onClose, onOk }: IAddContactModalProps) => {
  const theme = useTheme();

  const { state } = useContext(PhoneBookContext);
  // NOTE: If there is one selected or clicked contact this modal is for updating
  const { selectedContact } = state;

  const [newContact, setNewContact] = useState<IContact>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    setNewContact({
      firstName: selectedContact?.firstName || "",
      lastName: selectedContact?.lastName || "",
      phoneNumber: selectedContact?.phoneNumber || "",
    });
  }, [selectedContact]);

  const updateContact = (updatedFields: Omit<Partial<IContact>, "id">) => {
    setNewContact({ ...newContact, ...updatedFields });
  };

  const isFormValid = useMemo(() => {
    // NOTE: Check if the form fields are not empty
    return (
      newContact.firstName.length &&
      newContact.lastName.length &&
      newContact.phoneNumber.length
    );
  }, [newContact]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight="bold"
        >
          {selectedContact ? "Edit Contact" : "New Contact"}
        </Typography>
        <TextField
          fullWidth
          size="small"
          sx={{
            background: "white",
            marginBottom: theme.spacing(1),
          }}
          variant="outlined"
          placeholder="First Name"
          value={newContact.firstName}
          onChange={(e) => updateContact({ firstName: e.target.value })}
        />
        <TextField
          fullWidth
          size="small"
          sx={{
            background: "white",
            marginBottom: theme.spacing(1),
          }}
          variant="outlined"
          placeholder="Last Name"
          value={newContact.lastName}
          onChange={(e) => updateContact({ lastName: e.target.value })}
        />
        <TextField
          fullWidth
          size="small"
          sx={{
            background: "white",
            marginBottom: theme.spacing(1),
          }}
          variant="outlined"
          placeholder="Phone Number"
          value={newContact.phoneNumber}
          onChange={(e) => updateContact({ phoneNumber: e.target.value })}
        />
        <ModalActions>
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            onClick={() => onOk && onOk(newContact)}
          >
            <Typography variant="button">
              {selectedContact ? "Update" : "Add"}
            </Typography>
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            <Typography variant="button">Close</Typography>
          </Button>
        </ModalActions>
      </Card>
    </Modal>
  );
};

export default AddContactModal;
