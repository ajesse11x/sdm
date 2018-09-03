/*
 * Copyright © 2018 Atomist, Inc.
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

import { executePushReactions } from "../../../api-helper/listener/executePushReactions";
import { PushReactionGoal } from "../../machine/wellKnownGoals";
import { PushImpactListenerRegistration } from "../../registration/PushImpactListenerRegistration";
import { DefaultGoalNameGenerator } from "../GoalNameGenerator";
import { FulfillableGoalWithRegistrations } from "../GoalWithFulfillment";

/**
 * Goal that performs fingerprinting. Typically invoked early in a delivery flow.
 */
export class PushImpact extends FulfillableGoalWithRegistrations<PushImpactListenerRegistration> {

    constructor(private readonly uniqueName: string = DefaultGoalNameGenerator.generateName("push-impact")) {

        super({
            ...PushReactionGoal.definition,
            uniqueName,
            orderedName: `1.5-${uniqueName.toLowerCase()}`,
        });

        this.addFulfillment({
            name: `PushImpact-${this.uniqueName}`,
            goalExecutor: executePushReactions(this.registrations),
        });
    }
}
