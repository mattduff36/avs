interface ErrorLogData {
  message: string;
  error?: Error;
  component?: string;
  timestamp: string;
  userAgent?: string;
  url?: string;
  additionalData?: Record<string, unknown>;
}

class ErrorLogger {
  private logs: ErrorLogData[] = [];
  private maxLogs = 100; // Keep only last 100 logs

  logError(
    message: string,
    error?: Error,
    component?: string,
    additionalData?: Record<string, unknown>
  ) {
    const logData: ErrorLogData = {
      message,
      error,
      component,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      additionalData,
    };

    this.logs.push(logData);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error in ${component || 'Unknown Component'}`);
      console.error('Message:', message);
      if (error) {
        console.error('Error:', error);
        console.error('Stack:', error.stack);
      }
      if (additionalData) {
        console.error('Additional Data:', additionalData);
      }
      console.error('Timestamp:', logData.timestamp);
      console.error('URL:', logData.url);
      console.groupEnd();
    }

    // In production, you could send to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, LogRocket, etc.
      // this.sendToErrorService(logData);
    }
  }

  getLogs(): ErrorLogData[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  getRecentLogs(count: number = 10): ErrorLogData[] {
    return this.logs.slice(-count);
  }

  // Method to send logs to external error tracking service
  private sendToErrorService(logData: ErrorLogData) {
    // Implementation for external error tracking service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    console.log('Sending error to external service:', logData);
  }
}

// Create a singleton instance
export const errorLogger = new ErrorLogger();

// Convenience functions
export const logError = (
  message: string,
  error?: Error,
  component?: string,
  additionalData?: Record<string, unknown>
) => {
  errorLogger.logError(message, error, component, additionalData);
};

export const logComponentError = (
  component: string,
  message: string,
  error?: Error,
  additionalData?: Record<string, unknown>
) => {
  errorLogger.logError(message, error, component, additionalData);
};
