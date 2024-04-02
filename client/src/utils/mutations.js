//important to the useMutation we bring in gql from the applo client 

import { gql } from '@apollo/client';

//important to use for useMuation each mut we want to use to export port out of the mutation js utility 
export const useMutation = gql`
    mutation handelSaveBook()`