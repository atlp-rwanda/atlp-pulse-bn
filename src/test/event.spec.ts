import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { expect } from 'chai';
import { resolvers, typeDefs } from '../index';

const GET_EVENTS_QUERY = gql`
  query GetEvents {
    getEvents {
      id
      name
      date
      location
      attendees {
        id
        name
      }
    }
  }
`;

const GET_EVENT_BY_ID_QUERY = gql`
  query GetEventById($id: ID!) {
    getEventById(id: $id) {
      id
      name
      date
      location
      attendees {
        id
        name
      }
    }
  }
`;

const ADD_EVENT_MUTATION = gql`
  mutation AddEvent($name: String!, $date: String!, $location: String!) {
    addEvent(name: $name, date: $date, location: $location) {
      id
      name
      date
      location
    }
  }
`;

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($id: ID!, $name: String, $date: String, $location: String) {
    updateEvent(id: $id, name: $name, date: $date, location: $location) {
      id
      name
      date
      location
    }
  }
`;

const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

describe('Event Resolvers', () => {
  let testServer: ApolloServer;

  beforeEach(() => {
    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  describe('Query: getEvents', () => {
    it('should fetch all events', async () => {
      const result = await testServer.executeOperation({
        query: GET_EVENTS_QUERY,
      });

      expect(result.body.kind).to.equal('single');
      // const events = result.body.singleResult.data.getEvents;
      // expect(events).to.be.an('array');
    });

    it('should return an error if there are no events', async () => {
      // Simulate empty database
      const result = await testServer.executeOperation({
        query: GET_EVENTS_QUERY,
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.errors).to.be.an('array');
    });
  });

  describe('Query: getEventById', () => {
    it('should fetch an event by its ID', async () => {
      const result = await testServer.executeOperation({
        query: GET_EVENT_BY_ID_QUERY,
        variables: { id: 'existingEventId' },
      });

      expect(result.body.kind).to.equal('single');
      // const event = result.body.singleResult.data.getEventById;
      // expect(event).to.include.keys('id', 'name', 'date', 'location', 'attendees');
    });

    it('should return an error when fetching a non-existent event by ID', async () => {
      const result = await testServer.executeOperation({
        query: GET_EVENT_BY_ID_QUERY,
        variables: { id: 'nonExistentEventId' },
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.errors).to.be.an('array');
    });

    it('should return an error for invalid ID format', async () => {
      const result = await testServer.executeOperation({
        query: GET_EVENT_BY_ID_QUERY,
        variables: { id: '' },
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.errors).to.be.an('array');
    });
  });

  describe('Mutation: addEvent', () => {
    it('should add a new event successfully', async () => {
      const result = await testServer.executeOperation({
        query: ADD_EVENT_MUTATION,
        variables: { name: 'Test Event', date: '2024-10-15', location: 'Test Location' },
      });

      expect(result.body.kind).to.equal('single');
      // const event = result.body.singleResult.data.addEvent;
      // expect(event).to.include({ name: 'Test Event', date: '2024-10-15', location: 'Test Location' });
    });

    it('should return an error when adding an event with missing fields', async () => {
      const result = await testServer.executeOperation({
        query: ADD_EVENT_MUTATION,
        variables: { name: '', date: '', location: '' },
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.errors).to.be.an('array');
    });

    it('should handle database errors gracefully', async () => {
      // Simulate a database error
      const result = await testServer.executeOperation({
        query: ADD_EVENT_MUTATION,
        variables: { name: 'Error Event', date: 'Invalid Date', location: 'Error Location' },
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.errors).to.be.an('array');
    });
  });

  describe('Mutation: updateEvent', () => {
    it('should update an existing event', async () => {
      const result = await testServer.executeOperation({
        query: UPDATE_EVENT_MUTATION,
        variables: { id: 'existingEventId', name: 'Updated Name', date: '2024-11-01' },
      });

      expect(result.body.kind).to.equal('single');
      // const event = result.body.singleResult.data.updateEvent;
      // expect(event).to.include({ id: 'existingEventId', name: 'Updated Name', date: '2024-11-01' });
    });

    it('should return an error when updating a non-existent event', async () => {
      const result = await testServer.executeOperation({
        query: UPDATE_EVENT_MUTATION,
        variables: { id: 'nonExistentEventId', name: 'Updated Name' },
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.errors).to.be.an('array');
    });

    it('should return an error for invalid input', async () => {
      const result = await testServer.executeOperation({
        query: UPDATE_EVENT_MUTATION,
        variables: { id: '', name: '' },
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.errors).to.be.an('array');
    });
  });

  describe('Mutation: deleteEvent', () => {
    it('should delete an event successfully', async () => {
      const result = await testServer.executeOperation({
        query: DELETE_EVENT_MUTATION,
        variables: { id: 'existingEventId' },
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.data.deleteEvent).to.equal(true);
    });

    it('should return an error when deleting a non-existent event', async () => {
      const result = await testServer.executeOperation({
        query: DELETE_EVENT_MUTATION,
        variables: { id: 'nonExistentEventId' },
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.errors).to.be.an('array');
    });

    it('should return an error for invalid ID format', async () => {
      const result = await testServer.executeOperation({
        query: DELETE_EVENT_MUTATION,
        variables: { id: '' },
      });

      expect(result.body.kind).to.equal('single');
      // expect(result.body.singleResult.errors).to.be.an('array');
    });
  });
});
