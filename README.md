# React Native Front End Challenge

## Introduction

For this challenge, you will be completing the implementation of a simple photo manager app. This app should allow the user to manage a 2-column grid of photos.

## Functionality Requirements

Users should be able to select, add, and delete multiple photos at once. Some additional nice-to-have operations include the following:

- Expanding a single photo for larger individual viewing
- Sorting/reordering of photos

## Expected Implementations

- Implement PhotosList organism
- Implement screens to satisfy functionality requirements
- Implement client API logic to facilitate photo management
- Create storybook for any atoms and molecules created
  - Hint: You should probably have at least one or two of these

## Prescribed Implementation Details

- You must use Typescript.
- You must use `@tanstack/react-query` to interact with your client API. Documentation can be found [here](https://tanstack.com/query/latest/docs/react/installation).
- Your solution should run on iOS, Android, and Web. Be careful with any RN packages you decide to import and consider this when implementing your persistence.

## Help

- Make sure you check out `app/api.ts`
- Available photos are located in the `assets/photos` directory. You shouldn't need to do anything with them, as they are already being exported as an array of objects for easy referencing.
- Treat the local photos and api.ts as an external api for this assessment. For the sake of storage, if you use zustand or some other state manager for async storage, please separate it from your "client" state management.
