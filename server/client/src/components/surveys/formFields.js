export default [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  {
    label: 'Email Body',
    name: 'body',
    noValueError: 'You must include a body on the survey!'
  },
  {
    label: 'Recipients List',
    name: 'recipients',
    noValueError: 'You must include at least one email!'
  }
];
