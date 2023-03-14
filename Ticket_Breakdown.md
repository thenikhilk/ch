# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Work Items:

- **Feature**: Custom Agent ID mapping

  - **[1] User Story**: Data Entry Form UI Changes

    - **Description**: As a Facility Manager, I should have the ability to input custom IDs for agents working at the Facility.
      The Agent Information form should have the ability to edit the auto generated Agent ID.

      UI Mock-ups at: [link](#)

    - **Acceptance Criteria**: Ability to edit the Agent ID on the Agent Information form.
      Ability to navigate to the page using the ID in the URL
      `[hostname]/agents/{Agent ID}`
    - **Effort**: 5 Story Points

    - **Tasks**:
      1. Update Form UI and validations
      2. Update Network calls to consume and pass `CustomAgentID`
      3. Update Test UI test cases
         > Unit tests cases are assumed to always be updated with code changes, third task is to update UI Smoke tests to check Agent Form's new feature

  - **[2] User Story**: Backend and schema changes

    - **Description**: Add support for a custom Agent ID
      Make Changes to:

      - Update DB Columns to add new column support for `CustomAgentID`
      - Update data contracts for APIs
      - Update data queries to include new column in results

      > The default value for Agent ID will be the auto generated DB ID, overwrite if user input is provided.

    - **Acceptance Criteria**: All network requests and responses support CRUD based on `CustomAgentID`. The method to generate report `getShiftsByFacility` should accept `CustomAgentID` and return data.
    - **Effort**: 3 Story Points
    - **Tasks**:
      1. Update Agent Table DB to include `CustomAgentID`
      2. Update Agent Data Models in Web Service
      3. Update Agent Controller to consume and pass `CustomAgentID`.

  - **[3] User Story**: Reporting Changes

    - **Description**: As a reporting user, I should see `CustomAgentID` in the generated PDF reports for AgentID

    - **Acceptance Criteria**: PDF reports generated using `generateReport` should have the value for `CustomAgentID` under Agent ID column.
    - **Effort**: 2 Story Points
    - **Tasks**:
      1. Update Agent Report field mapping for Agent ID to `CustomAgentID`
