/*
 * Copyright © 2019 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ExecuteGoalResult } from "../ExecuteGoalResult";
import { GoalInvocation } from "../GoalInvocation";

/**
 * Launch a goal in an environment (container or process) for fulfillment.
 */
export interface GoalLauncher {

    /**
     * Does this GoalLauncher support launching provided goals
     * @param gi
     */
    supports(gi: GoalInvocation): Promise<boolean>;

    /**
     * Launch the provided goal
     * @param gi
     */
    launch(gi: GoalInvocation): Promise<ExecuteGoalResult>;
}