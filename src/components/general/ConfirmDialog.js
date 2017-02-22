import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  dialog: {
    maxWidth: '500px',
  },
};

const ConfirmDialog = ({
  open,
  title,
  message,
  object,
  ConfirmButtonText,
  onConfirm,
  onClose,
}) => (
  <Dialog
    contentStyle={styles.dialog}
    modal
    title={title}
    open={open}
    actions={[
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={onClose}
      />,
      <FlatButton
        label={ConfirmButtonText}
        primary
        onTouchTap={() => onConfirm(object)}
      />,
    ]}
  >
    {message}
  </Dialog>
);

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  object: PropTypes.any,
  ConfirmButtonText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

ConfirmDialog.defaultProps = {
  title: null,
  message: null,
  object: null,
  ConfirmButtonText: 'OK',
};

export default ConfirmDialog;
