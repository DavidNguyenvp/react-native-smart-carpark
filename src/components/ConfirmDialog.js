import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Dialog from 'react-native-dialog';

export default function ConfirmDialog({
  handleConfirm,
  isvisible,
  slot,
  hideDialog,
  title,
  message,
}) {
  //const [visible, setVisible] = useState(true);
  //const [slot, setSlot] = useState('');

  const showDialog = () => {
    // setVisible(true);
  };

  const handleCancel = () => {
    //setVisible(false);
    hideDialog();
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    //setVisible(false);
    if (handleConfirm) {
      handleConfirm(slot);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Show dialog" onPress={showDialog} /> */}
      <Dialog.Container visible={isvisible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{message}</Dialog.Description>
        {/* <Dialog.Input value={slot} onChangeText={text => setSlot(text)} /> */}
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Ok" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
