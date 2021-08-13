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
  buttons: Buttons[];

  /**
   * The time (in milliseconds) that the buttons can be interactable.
   */
  time: number;

  /**
   * Other buttons.
   */
  otherButtons: OtherButtons;
}

export interface Buttons {
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
  deleteButton?: boolean;

  /**
   * Indicates if the back to first page button should be in the slider.
   */
  backMainButton?: boolean;
}

export type ButtonNames = "back" | "foward" | "backMain" | "delete";

export type ButtonStyles = "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER";
