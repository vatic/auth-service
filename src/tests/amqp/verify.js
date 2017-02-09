#!/home/vatagin/.nvm/versions/node/v7.4.0/bin/node
const connect = require('./setup');

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODk5ZDYxMjkyMTdlNjVkMTQyZGI4OWUiLCJuYW1lIjoiU2VyZ2V5IFZhdGFnaW4iLCJlbWFpbCI6InMudmF0YWdpbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6InYxIiwiaW52YWxpZFRva2VucyI6WyJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKZmFXUWlPaUkxT0RrNVpEWXhNamt5TVRkbE5qVmtNVFF5WkdJNE9XVWlMQ0p1WVcxbElqb2lVMlZ5WjJWNUlGWmhkR0ZuYVc0aUxDSmxiV0ZwYkNJNkluTXVkbUYwWVdkcGJrQm5iV0ZwYkM1amIyMGlMQ0p3WVhOemQyOXlaQ0k2SW5ZeElpd2lhV0YwSWpveE5EZzJORGd3TXpZd2ZRLjVidEZyaFVhMHVVWm1UNWVTdlpndndlYkRsUGZpQjRLc2hELXZmVGpVNzAiLCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKZmFXUWlPaUkxT0RrNVpEWXhNamt5TVRkbE5qVmtNVFF5WkdJNE9XVWlMQ0p1WVcxbElqb2lVMlZ5WjJWNUlGWmhkR0ZuYVc0aUxDSmxiV0ZwYkNJNkluTXVkbUYwWVdkcGJrQm5iV0ZwYkM1amIyMGlMQ0p3WVhOemQyOXlaQ0k2SW5ZeElpd2lhVzUyWVd4cFpGUnZhMlZ1Y3lJNld5SmxlVXBvWWtkamFVOXBTa2xWZWtreFRtbEpjMGx1VWpWalEwazJTV3R3V0ZaRFNqa3VaWGxLWm1GWFVXbFBhVWt4VDBSck5WcEVXWGhOYW10NVRWUmtiRTVxVm10TlZGRjVXa2RKTkU5WFZXbE1RMHAxV1ZjeGJFbHFiMmxWTWxaNVdqSldOVWxHV21oa1IwWnVZVmMwYVV4RFNteGlWMFp3WWtOSk5rbHVUWFZrYlVZd1dWZGtjR0pyUW01aVYwWndZa00xYW1JeU1HbE1RMHAzV1ZoT2VtUXlPWGxhUTBrMlNXNVplRWxwZDJsaFYwWXdTV3B2ZUU1RVp6Sk9SR2QzVFhwWmQyWlJMalZpZEVaeWFGVmhNSFZWV20xVU5XVlRkbHBuZG5kbFlrUnNVR1pwUWpSTGMyaEVMWFptVkdwVk56QWlYU3dpYVdGMElqb3hORGcyTlRZMk5EZzFmUS5YejYwQUtOdU1Ha1JsMUpBV0tKeHlEdjhNMWRXeFJzRC1IaWloQnFjOTZzIl0sImlhdCI6MTQ4NjY0NDkyM30.maCgh_EjXU94uQ8TN0V-0frzmWmiLlQvkY5GjUzXlPU';
const invalidToken = 'fdsa';

const query = (token) => {
  return {
    params: {},
    headers: {
      'x-auth-token': token,
    },
    body: {},
  };
};

connect('rpc.auth.root.verify', query(validToken));
connect('rpc.auth.root.verify', query(invalidToken));

