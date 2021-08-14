import { Message, MessageEmbed } from "discord.js";

export interface SliderOptions {
  /**
   * Discord.js message class.
   */
  message: Message;

  /**
   *  Array of Embeds to use in the slider.
   */
  embeds: MessageEmbed[];

  /**
   * Messages that will be sent (in ephemeral mode) when a button is clicked.
   */
  replyMessages: ReplyMessages;

  /**
   *  Options for your buttons.
   */
  buttons: Button[];

  /**
   * The time (in milliseconds) that the buttons can be interactable.
   */
  time: number;

  /**
   * Other buttons.
   */
  otherButtons: OtherButtons;
}

export interface Button {
  /**
   * Name of the button.
   */
  name: ButtonNames;

  /**
   * Emoji used on the button.
   */
  emoji: string;

  /**
   * Style of the button.
   */
  style?: ButtonStyles;
}

export interface ReplyMessages {
  /**
   * Reply sent when the back button is clicked.
   */
  back: string;

  /**
   * Reply sent when the foward button is clicked.
   */
  foward: string;

  /**
   * Reply sent when the back to first page button is clicked.
   */
  backMain: string;
}

export interface OtherButtons {
  /**
   * Indicates if the delete button should be in the slider.
   */
  deleteButton?: OtherButtonsOptions;

  /**
   * Indicates if the back to first page button should be in the slider.
   */
  backMainButton?: OtherButtonsOptions;
}

export interface OtherButtonsOptions {
  /**
   * Whether the button should be enabled or not.
   */
  enabled: boolean;

  /**
   * Position of the button in the row. You need to set a positive index,
   * the default buttons (back, foward) are in the array and you can't change
   * their position and the back to first page button is the first button
   * that will receive the position and the delete button after. So make sure
   * to set a correct index if you want to do something very specific.
   */
  position?: number;
}

export type ButtonNames = "back" | "foward" | "backMain" | "delete";

export type ButtonStyles = "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER";
