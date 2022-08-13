import React from 'react';
import { connect } from 'react-redux';
import {testServer} from '../../../store/storeIndex';

const TestServerConnection = (props) => {
    return (
        <div>
            <h1>Test Server Connection</h1>
            <button onClick={props.fetchServerStatus}>Test</button>
            <h1>
                Server status <hr></hr>
                {/* {console.log(props.state)}
                 */}
                 {props.state.isLoading && <span>Loading...</span>}
                    {props.state.error && <span>{props.state.error}</span>}
                    {props.state.serverStatus && <span>{props.state.serverStatus}</span>}
            </h1>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state.serverTest
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // TO DO - add dispatch functions
        fetchServerStatus: () => dispatch(testServer()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TestServerConnection);

