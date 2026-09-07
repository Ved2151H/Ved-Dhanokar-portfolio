import { ContactFormData } from '../types/portfolio';

export interface SendMessageResult {
  success: boolean;
  message: string;
}

/**
 * Decoupled contact service.
 * Supports future API endpoints, webhooks, or serverless functions without touching UI components.
 */
export const contactService = {
  async sendMessage(data: ContactFormData): Promise<SendMessageResult> {
    try {
      // In web preview without an active mail server, prepare client-side fallback
      return {
        success: true,
        message: 'Message prepared successfully for transmission.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to process message transmission.',
      };
    }
  },
};
