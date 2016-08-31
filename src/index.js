'use strict';
import React from 'react';
import {render} from 'react-dom';
import App from 'components/app';
import QuestionList from 'components/question-list';
import StoreInsertQuestion from 'components/storeInsertQuestion';

render(<QuestionList />, document.getElementById('app'));