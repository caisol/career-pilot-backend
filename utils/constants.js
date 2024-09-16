const fieldConditions = [
  {
    name: "Has",
    key: "has"
  },
  {
    name: "Has Not",
    key: "hasNot"
  },
  {
    name: "Has Length",
    key: "hasLength"
  },
  {
    name: "Has Length Greater Than",
    key: "hasLengthGreaterThan"
  },
  {
    name: "Has Length Less Than",
    key: "hasLengthLessThan"
  },
  {
    name: "Includes",
    key: "includes"
  },
  {
    name: "Not Includes",
    key: "notIncludes"
  }
];
const fieldKeywords = [
  { value: "first_name", label: "First Name" },
  { value: "email", label: "Email" },
  { value: "address", label: "Address" },
  { value: "address2", label: "Secondary Address" },
  { value: "current_job_title", label: "Current Job Title" },
  { value: "last_name", label: "Last Name" },
  { value: "mobile", label: "Mobile" },
  { value: "gender", label: "Gender" },
  { value: "immigration_status", label: "Immigration Status" },
  { value: "located_city", label: "City" },
  { value: "located_state", label: "State" },
  { value: "location_preference", label: "Location Prefenece" },
  { value: "availability", label: "Availability" },
  { value: "description", label: "Description" },
  { value: "primary_skills", label: "Skills" }
];
module.exports = {fieldConditions, fieldKeywords};
