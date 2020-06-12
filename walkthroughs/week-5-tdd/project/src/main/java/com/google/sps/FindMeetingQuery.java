// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;


public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    List<TimeRange> unavailableTimes = new ArrayList<>();
    Collection<TimeRange> meetingTimes = new LinkedHashSet<>();
    int start = TimeRange.START_OF_DAY;
    int end;

    // Add event time to unavailable times if the event contains a required person.
    for (Event event : events) {
        if (!checkRequired(event.getAttendees(), request.getAttendees())) {
            continue;
        }
        unavailableTimes.add(event.getWhen());
    }

    // Sort unavailable times by their start times.
    Collections.sort(unavailableTimes);

    // Loop through unavailable times to find potential meeting times
    for (int i = 0; i < unavailableTimes.size(); i++) {
      TimeRange time = unavailableTimes.get(i);

      if (i < unavailableTimes.size() - 1) {
        TimeRange nextTime = unavailableTimes.get(i + 1);

        // Combine current and next times into one time.
        if (time.overlaps(nextTime)) {
            int earliest = Math.min(time.start(), nextTime.start());
            int latest = Math.max(time.end(), nextTime.end());

            time = TimeRange.fromStartEnd(earliest, latest, false);
            i++;
        }
      }

      // If the event starts in the beggining of the day, make the 
      // first possible start at the end of this event. 
      if (time.start() == 0) {
        start = time.end();
      }
      end = time.start();

      if (end - start > 0 && request.getDuration() <= end - start) {
        meetingTimes.add(TimeRange.fromStartEnd(start, end, false));
      }
      start = time.end();
    }

    end = TimeRange.END_OF_DAY;

    if (request.getDuration() <= end - start) {
      meetingTimes.add(TimeRange.fromStartEnd(start, end, true));
    }
    return new ArrayList<TimeRange>(meetingTimes);
  }

  /** 
    * Return true iff any person in {@code inEvents} are contained in
    * {@code required}.
    * @param inEvents list of people that are in an event.
    * @param required list of people that are required to attend the requested meeting.
    */
  public boolean checkRequired(Collection<String> inEvents, Collection<String> required) {
    return !Collections.disjoint(inEvents, required);
  }
}
