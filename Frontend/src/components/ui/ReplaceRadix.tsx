import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  Divider,
  List,
  Menu,
  Portal,
  ProgressBar,
  RadioButton,
  Switch,
  TextInput,
} from "react-native-paper";
import { Avatar, Icon, Overlay, Tooltip } from "react-native-elements";

// Basic component replacements for Radix UI components
export const RNButton = ({
  children,
  onPress,
  mode = "contained",
  ...props
}) => (
  <Button mode={mode} onPress={onPress} {...props}>
    {children}
  </Button>
);

export const RNCard = ({ children, title, ...props }) => (
  <Card {...props}>
    {title && <Card.Title title={title} />}
    <Card.Content>{children}</Card.Content>
  </Card>
);

export const RNCheckbox = ({ checked, onCheckedChange, label, ...props }) => (
  <Checkbox.Item
    label={label}
    status={checked ? "checked" : "unchecked"}
    onPress={() => onCheckedChange(!checked)}
    {...props}
  />
);

export const RNDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  ...props
}) => (
  <Portal>
    <Dialog visible={open} onDismiss={() => onOpenChange(false)} {...props}>
      {title && <Dialog.Title>{title}</Dialog.Title>}
      {description && (
        <Dialog.Content>
          <Text>{description}</Text>
        </Dialog.Content>
      )}
      {children}
      <Dialog.Actions>
        <Button onPress={() => onOpenChange(false)}>Close</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export const RNDivider = (props) => <Divider {...props} />;

export const RNList = ({ children, ...props }) => (
  <List.Section {...props}>{children}</List.Section>
);

export const RNListItem = ({ title, description, onPress, ...props }) => (
  <List.Item
    title={title}
    description={description}
    onPress={onPress}
    {...props}
  />
);

export const RNMenu = ({ open, onOpenChange, trigger, children, ...props }) => (
  <Menu
    visible={open}
    onDismiss={() => onOpenChange(false)}
    anchor={trigger}
    {...props}
  >
    {children}
  </Menu>
);

export const RNMenuItem = ({ onSelect, title, ...props }) => (
  <Menu.Item onPress={onSelect} title={title} {...props} />
);

export const RNProgressBar = ({ value, ...props }) => (
  <ProgressBar progress={value} {...props} />
);

export const RNRadioGroup = ({ value, onValueChange, children, ...props }) => (
  <RadioButton.Group onValueChange={onValueChange} value={value} {...props}>
    {children}
  </RadioButton.Group>
);

export const RNRadio = ({ value, label, ...props }) => (
  <RadioButton.Item label={label} value={value} {...props} />
);

export const RNSwitch = ({ checked, onCheckedChange, ...props }) => (
  <Switch value={checked} onValueChange={onCheckedChange} {...props} />
);

export const RNTextInput = ({ value, onValueChange, label, ...props }) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onValueChange}
    {...props}
  />
);

export const RNTooltip = ({ content, children, ...props }) => (
  <Tooltip popover={<Text>{content}</Text>} {...props}>
    {children}
  </Tooltip>
);

export const RNAvatar = ({ src, alt, ...props }) => (
  <Avatar source={{ uri: src }} title={alt} {...props} />
);

export const RNIcon = ({ name, type = "material", ...props }) => (
  <Icon name={name} type={type} {...props} />
);

export const RNOverlay = ({ open, onOpenChange, children, ...props }) => (
  <Overlay
    isVisible={open}
    onBackdropPress={() => onOpenChange(false)}
    {...props}
  >
    {children}
  </Overlay>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
