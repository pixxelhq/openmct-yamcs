/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2020, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import webpack from 'webpack';

// Replicate __dirname functionality for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRootDir = path.resolve(__dirname, '..');

/** @type {import('webpack').Configuration} */
const prodConfig = {
    context: projectRootDir,
    mode: 'production',
    entry: {
        'openmct-yamcs': path.resolve(projectRootDir, 'src/openmct-yamcs.js')
    },
    devtool: 'source-map'
};

export default merge(common, prodConfig);
