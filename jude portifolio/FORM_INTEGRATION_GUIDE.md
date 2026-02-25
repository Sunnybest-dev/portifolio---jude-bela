# Supabase Form Integration Example

## Newsletter Form (Already Integrated)
The NewsletterSection.jsx has been updated with Supabase integration.

## To Connect Other Forms:

### 1. Import Supabase at the top of your form component:
```javascript
import { useState } from "react";
import { supabase } from "../lib/supabase";
```

### 2. Add state for form data:
```javascript
const [formData, setFormData] = useState({
  first_name: "",
  last_name: "",
  email: "",
  // ... other fields
});
const [status, setStatus] = useState("");
```

### 3. Add submit handler:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");

  const { error } = await supabase
    .from("research_writer_applications") // or your table name
    .insert([formData]);

  if (error) {
    setStatus("error");
    console.error(error);
  } else {
    setStatus("success");
    // Reset form
  }
};
```

### 4. Update form inputs:
```javascript
<input
  type="text"
  value={formData.first_name}
  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
  required
/>
```

### 5. Wrap inputs in <form> tag:
```javascript
<form onSubmit={handleSubmit}>
  {/* inputs here */}
  <button type="submit">Submit</button>
</form>
```

## Next Steps:
1. Add your Supabase credentials to `.env`
2. Run the SQL schema in Supabase dashboard
3. Test the newsletter form first
4. Apply the same pattern to other forms

The newsletter form is working as a reference example!
