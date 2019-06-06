import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

const CampaignDetailModal = props => {
  const { campaignDetail, isOpen ,handleClose} = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <Modal open={isOpen}>
      <div style={modalStyle} className={classes.paper}>
        {campaignDetail && <Table>
          <TableHead>
            <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Campaign</TableCell>
            <TableCell align="right">View&nbsp;</TableCell>
            <TableCell align="right">Actions&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={campaignDetail.id}>
              <TableCell component="th" scope="row">
                {Math.round((new Date() - new Date(campaignDetail.date))/ (1000*60*60*24) ) }
                {' '} days ago
              </TableCell>
              <TableCell align="right">{campaignDetail.campaign}</TableCell>
              <TableCell align="right">{campaignDetail.view}</TableCell>
              <TableCell align="right">{campaignDetail.actions}</TableCell>
            </TableRow>
          </TableBody>
        </Table>}
        <Button onClick={handleClose} color="primary">
            Close
        </Button>
      </div>
    </Modal>
  );
};
export default CampaignDetailModal;
