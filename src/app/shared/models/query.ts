import { ActivatedRoute, Router } from '@angular/router';

export function changeQuery(
  router: Router,
  route: ActivatedRoute,
  genre: string,
  startDate: string,
  endDate: string,
) {
  router.navigate(['.'], {
    relativeTo: route,
    queryParams: {
      with_genre: genre,
      startDate: startDate,
      endDate: endDate,
    },
  });
}
