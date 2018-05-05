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

import { logger } from "@atomist/automation-client";
import { Fingerprint } from "@atomist/automation-client/project/fingerprint/Fingerprint";
import * as _ from "lodash";
import { PushImpactListenerInvocation } from "../../../..";
import { PushReaction } from "../PushReactionRegistration";
import { FingerprinterResult } from "./FingerprinterRegistration";

export async function computeFingerprints(cri: PushImpactListenerInvocation,
                                          fingerprinters: Array<PushReaction<FingerprinterResult>>): Promise<Fingerprint[]> {
    const results: Fingerprint[][] = await Promise.all(
        fingerprinters.map(async fp => {
            logger.info("Using fingerprinter %s to fingerprint %j", fp.name, cri.id);
            const f = await fp(cri);
            return isFingerprint(f) ? [f] : f;
        }),
    );
    return _.flatten(results);
}

export function isFingerprint(a: any): a is Fingerprint {
    const fq = a as Fingerprint;
    return !!fq.sha && !!fq.version;
}
