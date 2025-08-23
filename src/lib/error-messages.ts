export interface ErrorMessageConfig {
  title: string;
  message: string;
  suggestion?: string;
  action?: string;
}

export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: {
    title: "Connection Error",
    message: "Unable to connect to the server. Please check your internet connection.",
    suggestion: "Try refreshing the page or check your network connection.",
    action: "Try Again"
  },

  // Image loading errors
  IMAGE_LOAD_ERROR: {
    title: "Image Loading Failed",
    message: "Unable to load the image. This might be due to a network issue or the image may have been moved.",
    suggestion: "The image will be replaced with a placeholder.",
    action: "Continue"
  },

  // Page loading errors
  PAGE_LOAD_ERROR: {
    title: "Page Loading Failed",
    message: "Something went wrong while loading this page. This might be a temporary issue.",
    suggestion: "Try refreshing the page or navigate to a different section.",
    action: "Refresh Page"
  },

  // Component errors
  COMPONENT_ERROR: {
    title: "Component Error",
    message: "A part of the page encountered an error. The rest of the page should still work normally.",
    suggestion: "Try refreshing the page or contact support if the problem persists.",
    action: "Try Again"
  },

  // External link errors
  EXTERNAL_LINK_ERROR: {
    title: "External Link Error",
    message: "Unable to open the external link. This might be due to browser restrictions or the link may be unavailable.",
    suggestion: "Try copying the link and opening it in a new tab, or contact us for assistance.",
    action: "Copy Link"
  },

  // Form submission errors
  FORM_SUBMISSION_ERROR: {
    title: "Form Submission Failed",
    message: "Unable to submit the form. Please check your information and try again.",
    suggestion: "Make sure all required fields are filled out correctly.",
    action: "Try Again"
  },

  // General fallback
  GENERAL_ERROR: {
    title: "Something Went Wrong",
    message: "An unexpected error occurred. We're working to fix this issue.",
    suggestion: "Try refreshing the page or contact our support team if the problem continues.",
    action: "Contact Support"
  }
} as const;

export function getErrorMessage(errorType: keyof typeof ERROR_MESSAGES): ErrorMessageConfig {
  return ERROR_MESSAGES[errorType];
}

export function getErrorMessageByCode(errorCode?: string): ErrorMessageConfig {
  if (!errorCode) {
    return ERROR_MESSAGES.GENERAL_ERROR;
  }

  // Map common error codes to user-friendly messages
  const errorCodeMap: Record<string, keyof typeof ERROR_MESSAGES> = {
    'NETWORK_ERROR': 'NETWORK_ERROR',
    'IMAGE_LOAD_ERROR': 'IMAGE_LOAD_ERROR',
    'PAGE_LOAD_ERROR': 'PAGE_LOAD_ERROR',
    'COMPONENT_ERROR': 'COMPONENT_ERROR',
    'EXTERNAL_LINK_ERROR': 'EXTERNAL_LINK_ERROR',
    'FORM_SUBMISSION_ERROR': 'FORM_SUBMISSION_ERROR',
  };

  const errorType = errorCodeMap[errorCode];
  return errorType ? ERROR_MESSAGES[errorType] : ERROR_MESSAGES.GENERAL_ERROR;
}

export function createCustomErrorMessage(
  title: string,
  message: string,
  suggestion?: string,
  action?: string
): ErrorMessageConfig {
  return {
    title,
    message,
    suggestion,
    action
  };
}
