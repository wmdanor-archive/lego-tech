import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
} from 'react';
import { Form, Input } from 'reactstrap';

interface Props {
  query: string;
  setQuery: (value: string) => void;
  searchSubmitHandler: FormEventHandler<HTMLFormElement>;
}

const LocationsSearchBarForm: FC<Props> = ({
  query,
  setQuery,
  searchSubmitHandler,
}) => {
  const searchHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      setQuery(event.currentTarget.value);
    },
    [setQuery],
  );

  return (
    <div>
      <Form onSubmit={searchSubmitHandler} className='d-flex'>
        <Input
          type='search'
          placeholder='Search'
          aria-label='Search'
          value={query}
          onChange={searchHandler}
        />
      </Form>
    </div>
  );
};

export default LocationsSearchBarForm;
