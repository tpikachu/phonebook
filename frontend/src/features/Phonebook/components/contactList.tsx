import { useContext, useEffect } from "react";
import { Box, List, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import PhoneIcon from "@mui/icons-material/Phone";

import { IAction, IContact } from "../../../types";
import { PhoneBookContext } from "../../../context/phoneBook";

import LoadingSpinner from "../../../components/LoadingSpinner";

import useQueryGetContacts from "../hooks/useQueryGetContacts";
import useMutationDeleteContact from "../hooks/useMutationDeleteContact";

interface IContactListProps {
  onEditContact: (contact: IContact) => void;
}

const ContactListContainer = styled(Box)({
  height: "80%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const ContatListContent = styled(List)(({ theme }) => ({
  overflowY: "auto",
  height: "100%",
  width: "100%",
  background: "white",
  border: `0.5px solid ${theme.palette.grey[300]}`,
  padding: 0,
  borderRadius: theme.spacing(2),
}));

const ContactItem = styled(Box)<any>(({ theme, index }) => ({
  borderTop: index === 0 ? "none" : `0.5px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

const ContactList = ({ onEditContact }: IContactListProps) => {
  const theme = useTheme();
  const { state, dispatch } = useContext(PhoneBookContext);

  const { data: contacts, isLoading } = useQueryGetContacts();
  const {
    mutate,
    isSuccess,
    isLoading: isDeleting,
    error,
  } = useMutationDeleteContact();

  const deleteContact = (id: number) => {
    mutate(id);
  };

  useEffect(() => {
    if (isSuccess) {
      // NOTE: After delete mutation is done and trigger refetch
      // Right now, react-query refetch is not working correctly. For temporary, we refresh the browser
      // refetch();
      window.location.reload();
    }

    if (error) {
      const action: IAction = {
        type: "DELETE_CONTACT_MUTATION_FAILED",
        payload: {
          error,
        },
      };
      dispatch(action);
    }
  }, [isSuccess, error, dispatch]);

  useEffect(() => {
    if (state.refetchContactsRequired) {
      // Right now, react-query refetch is not working correctly. For temporary, we refresh the browser
      // refetch();
      window.location.reload();
    }
  }, [state.refetchContactsRequired]);

  return (
    <ContactListContainer>
      <ContatListContent>
        {(isLoading || isDeleting) && <LoadingSpinner />}
        {contacts &&
          contacts.map((contact: any, index: number) => (
            <ContactItem key={contact.id} index={index}>
              <Box>
                <Typography fontWeight="bold">
                  {contact.firstName + " " + contact.lastName}
                </Typography>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <PhoneIcon sx={{ color: theme.palette.grey[400] }} />
                  <Typography color={theme.palette.grey[400]}>
                    {contact.phoneNumber}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" gap="10px">
                <ModeEditOutlinedIcon
                  onClick={() => onEditContact(contact)}
                  sx={{
                    background: theme.palette.primary.main,
                    padding: theme.spacing(1),
                    color: "white",
                    borderRadius: theme.spacing(1),
                  }}
                />
                <DeleteOutlineOutlinedIcon
                  onClick={() => deleteContact(contact.id)}
                  sx={{
                    background: theme.palette.error.main,
                    padding: theme.spacing(1),
                    color: "white",
                    borderRadius: theme.spacing(1),
                  }}
                />
              </Box>
            </ContactItem>
          ))}
      </ContatListContent>
    </ContactListContainer>
  );
};

export default ContactList;
