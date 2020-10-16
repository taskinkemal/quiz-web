import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';

  function Main(): ReactElement {

    return (
        <div>
        welcome to Quiz Maker.
</div>
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
  });
  
  const mapStateToProps = (state: AppState) => {
    const { application } = state;
    return {
      isInitialized: application.initialized
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);