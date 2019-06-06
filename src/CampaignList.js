import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import campaignList from "./CampaignListMock";
import CampaignDetailModal from "./CampaignDetailModal";
import formatDate from "./dateUtils";
import MaterialUIPickers from "./DatePicker";
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

function CampaignList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(-1);
  const handleOpen = id => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Campaign</StyledTableCell>
            <StyledTableCell align="right">View&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Actions&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Schedule&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaignList.map((campaign, index) => (
            <StyledTableRow
              key={campaign.id}
              onClick={() => {
                handleOpen(index);
              }}
            >
              <StyledTableCell component="th" scope="row">
                {formatDate(campaign.date)}
                <div>
                  {Math.round(
                    (new Date() - new Date(campaign.date)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days ago
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                {campaign.campaign}
              </StyledTableCell>
              <StyledTableCell align="right">{campaign.view}</StyledTableCell>
              <StyledTableCell align="right">
                {campaign.actions}
              </StyledTableCell>
              <StyledTableCell align="right">
                <img
                  src="https://img.icons8.com/material/24/000000/calendar-22.png"
                  alt="x"
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <CampaignDetailModal
        isOpen={open}
        campaignDetail={campaignList[selectedId]}
        handleClose={handleClose}
      />
    </Paper>
  );
}

export default CampaignList;
