import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Typography,
  // InputAdornment,
  // TextField,
} from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import { styled } from "@mui/system";

// import SearchIcon from "@mui/icons-material/Search";

import { IContact, IAction } from "../../types";
import { PhoneBookContext } from "../../context/phoneBook";

import AddContactModal from "./components/addContactModal";
import ContactList from "./components/contactList";

import useMutationAddContact from "./hooks/useMutationAddContact";
import useMutationUpdateContact from "./hooks/useMutationUpdateContact";

const PhonebookContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const PhonebookContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "350px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "500px",
  },
  height: "600px",
  padding: theme.spacing(3),
  background: theme.palette.grey[200],
}));

const PhonebookHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const ContactAddSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Phonebook = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(PhoneBookContext);
  const { selectedContact } = state;

  const {
    mutate: addMutate,
    isSuccess: addContactSuccess,
    error: addContactError,
  } = useMutationAddContact();

  const {
    mutate: updateMutate,
    isSuccess: updateContactSuccess,
    error: updateContactError,
  } = useMutationUpdateContact();

  const addOrUpdateContact = (contact: IContact) => {
    // NOTE: Close modal and execute mutation
    setOpen(false);
    if (selectedContact) {
      updateMutate({ id: selectedContact.id, ...contact });
    } else {
      addMutate(contact);
    }
  };

  const onEditContact = (contact: IContact) => {
    const action = {
      type: "SET_SELECTED_CONTACT",
      payload: {
        selectedContact: contact,
      },
    };
    dispatch(action);
    setOpen(true);
  };

  const onCloseContactModal = () => {
    setOpen(false);
    // NOTE: After closing the Modal reset the selected Contact as undefined
    const action = {
      type: "SET_SELECTED_CONTACT",
      payload: {
        selectedContact: undefined,
      },
    };
    dispatch(action);
  };

  useEffect(() => {
    if (addContactSuccess) {
      // NOTE: After add mutation is done and trigger refetch
      const action: IAction = {
        type: "CREATE_CONTACT_MUTATION_SUCCESS",
        payload: {},
      };
      dispatch(action);
    }

    if (addContactError) {
      const action: IAction = {
        type: "CREATE_CONTACT_MUTATION_FAILED",
        payload: {
          error: addContactError,
        },
      };
      dispatch(action);
    }
  }, [dispatch, addContactSuccess, addContactError]);

  useEffect(() => {
    if (updateContactSuccess) {
      // NOTE: After add mutation is done and trigger refetch
      const action: IAction = {
        type: "UPDATE_CONTACT_MUTATION_SUCCESS",
        payload: {},
      };
      dispatch(action);
    }

    if (updateContactError) {
      const action: IAction = {
        type: "UPDATE_CONTACT_MUTATION_FAILED",
        payload: {
          error: updateContactError,
        },
      };
      dispatch(action);
    }
  }, [dispatch, updateContactSuccess, updateContactError]);

  return (
    <PhonebookContainer>
      <AddContactModal
        open={open}
        onClose={onCloseContactModal}
        onOk={addOrUpdateContact}
      />
      <PhonebookContent>
        <PhonebookHeader>
          <ContactsIcon />
          <Typography variant="h4" fontWeight="bold">
            Phone Book App
          </Typography>
        </PhonebookHeader>
        <ContactAddSection>
          <Typography variant="h6" fontWeight="bold">
            Contacts
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            <Typography variant="button" fontWeight="bold">
              + Add Contact
            </Typography>
          </Button>
        </ContactAddSection>
        {/* <TextField
          fullWidth
          size="small"
          sx={{
            background: "white",
            marginBottom: theme.spacing(1),
          }}
          variant="outlined"
          placeholder="Search for contact by last name..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
        <ContactList onEditContact={onEditContact} />
      </PhonebookContent>
    </PhonebookContainer>
  );
};

export default Phonebook;
