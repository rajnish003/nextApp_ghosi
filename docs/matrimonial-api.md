# Matrimonial API Integration

This document describes the matrimonial API integration that has been added to the Ghosi Community website.

## Overview

The matrimonial section now includes a complete API integration with the following features:

- **Profile Management**: Create, update, and delete matrimonial profiles
- **Match Discovery**: Get personalized matches based on user preferences
- **State Management**: Centralized state management using Zustand
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Proper loading states for better UX

## API Endpoints

The following endpoints have been added to the matrimonial section:

### 1. Create Profile
- **Endpoint**: `POST /createProfile`
- **Description**: Create a new matrimonial profile
- **Usage**: Used when a user creates their first matrimonial profile

### 2. Update Profile
- **Endpoint**: `PUT /updateProfile`
- **Description**: Update an existing matrimonial profile
- **Usage**: Used when a user wants to modify their profile information

### 3. Delete Profile
- **Endpoint**: `DELETE /deleteProfile`
- **Description**: Schedule profile deletion (soft delete)
- **Usage**: Used when a user wants to remove their profile

### 4. Get Matches
- **Endpoint**: `GET /matches/:userId`
- **Description**: Get personalized matches for a user
- **Usage**: Used to display potential matches to users

## Store Structure

### Matrimonial Store (`matrimonialStore.ts`)

The matrimonial functionality is managed through a dedicated Zustand store with the following features:

#### State
```typescript
interface MatrimonialState {
  profile: MatrimonialProfile | null;
  matches: MatrimonialMatch[];
  loading: boolean;
  error: string | null;
  success: string | null;
}
```

#### Actions
- `createProfile(profileData, navigate?)`: Create a new profile
- `updateProfile(profileData, navigate?)`: Update existing profile
- `deleteProfile(navigate?)`: Delete profile
- `getMatches(userId)`: Get personalized matches
- `setProfile(profile)`: Set profile in state
- `setMatches(matches)`: Set matches in state

#### Utility Hook
```typescript
const { 
  profile, 
  matches, 
  loading, 
  error, 
  success,
  createProfile,
  updateProfile,
  deleteProfile,
  getMatches,
  hasProfile, // computed
  matchCount  // computed
} = useMatrimonial();
```

## Data Types

### MatrimonialProfile
```typescript
interface MatrimonialProfile {
  user_id: number;
  dateOfBirth: string;
  gender: string;
  contactNumber?: string;
  height: string;
  maritalStatus: string;
  weight: string;
  education: string;
  occupation: string;
  income: string;
  country: string;
  state: string;
  city: string;
  hobbies: string;
  about_me: string;
}
```

### MatrimonialMatch
```typescript
interface MatrimonialMatch {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  education: string;
  occupation: string;
  location: string;
  image?: string;
}
```

## Usage Examples

### Creating a Profile Form

```typescript
import { useMatrimonial } from '../_zustand/matrimonialStore';
import { useAuth } from '../_zustand/authStore';

const ProfileForm = () => {
  const { user } = useAuth();
  const { createProfile, updateProfile, profile, loading } = useMatrimonial();

  const handleSubmit = async (formData) => {
    const profileData = {
      user_id: parseInt(user._id),
      ...formData
    };

    if (profile) {
      await updateProfile(profileData);
    } else {
      await createProfile(profileData);
    }
  };

  return (
    // Your form JSX
  );
};
```

### Displaying Matches

```typescript
import { useMatrimonial } from '../_zustand/matrimonialStore';
import { useAuth } from '../_zustand/authStore';

const MatchesList = () => {
  const { user } = useAuth();
  const { getMatches, matches, loading } = useMatrimonial();

  useEffect(() => {
    if (user) {
      getMatches(parseInt(user._id));
    }
  }, [user]);

  return (
    <div>
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};
```

## Components

### MatrimonialProfileForm
A complete form component for creating and updating matrimonial profiles.

**Features:**
- Form validation
- Loading states
- Error handling
- Success messages
- Responsive design

**Usage:**
```typescript
import MatrimonialProfileForm from '../components/matrimonial/MatrimonialProfileForm';

// In your page
<MatrimonialProfileForm />
```

### MatrimonialMatches
A component to display matrimonial matches with filtering and search capabilities.

**Features:**
- Match cards with profile information
- Loading states
- Error handling
- Responsive grid layout
- Action buttons (View Profile, Connect)

**Usage:**
```typescript
import MatrimonialMatches from '../components/matrimonial/MatrimonialMatches';

// In your page
<MatrimonialMatches />
```

## Error Handling

The API integration includes comprehensive error handling:

1. **Network Errors**: Handled with user-friendly messages
2. **Validation Errors**: Displayed to users with specific field information
3. **Server Errors**: Gracefully handled with fallback messages
4. **Loading States**: Proper loading indicators during API calls

## Toast Notifications

All API operations include toast notifications:
- Success messages for successful operations
- Error messages for failed operations
- Loading indicators during API calls

## Persistence

The matrimonial store uses localStorage persistence for:
- User profile data
- Matches data
- Loading states are not persisted

## Security Considerations

1. **Authentication**: All matrimonial endpoints require user authentication
2. **Authorization**: Users can only access their own profile and matches
3. **Data Validation**: Input validation on both client and server side
4. **Error Sanitization**: Error messages are sanitized to prevent information leakage

## Backend Integration

The matrimonial API integrates with the existing backend:

### Database Models
- `UserProfile`: Stores user profile information
- `MatchProfile`: Stores match preferences
- `User`: Base user information

### Controllers
- `Profile.js`: Handles profile CRUD operations
- `MatchController.js`: Handles match discovery logic

### Routes
All matrimonial routes are defined in `router.js` and follow RESTful conventions.

## Future Enhancements

1. **Advanced Matching**: Implement more sophisticated matching algorithms
2. **Real-time Updates**: Add WebSocket support for real-time match notifications
3. **Photo Upload**: Add profile photo upload functionality
4. **Chat System**: Implement in-app messaging between matched users
5. **Privacy Controls**: Add granular privacy settings for profiles

## Testing

To test the matrimonial API integration:

1. **Create a Profile**: Use the MatrimonialProfileForm component
2. **View Matches**: Use the MatrimonialMatches component
3. **Update Profile**: Modify existing profile data
4. **Delete Profile**: Test profile deletion functionality

## Troubleshooting

### Common Issues

1. **Profile Not Found**: Ensure user is authenticated and profile exists
2. **No Matches**: Check if user has set match preferences
3. **API Errors**: Verify backend server is running and endpoints are accessible
4. **State Issues**: Clear localStorage if state becomes inconsistent

### Debug Tips

1. Check browser console for API errors
2. Verify network requests in browser dev tools
3. Check Zustand store state using Redux DevTools
4. Verify authentication token is valid 