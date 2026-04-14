# dilbert-card-ha [![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

A HACS frontend card which pulls the latest Dilbert comic into your Home Assistant dashboard every day.


## Credits

Dilbert is created by Scott Adams. This card relies on the outstanding work of the community that maintains [Comics RSS](https://www.comicsrss.com/). Thanks to Brian Fitzgerald for the original custom card repository that inspired this project. https://github.com/Brianfit/calvin-card-ha  This HACS Card carries a Creative Commons BY-NC license - meaning you are free to share provided attribution is made and the work is not used for commercial purposes.

You'll want to run that every 24 hours to get the latest comic. First, open up your `configuration.yaml` and add the following code:

```yaml
shell_command:
  run_dilbert: "sh /config/www/community/dilbert-card-ha/dilbert.sh"
```



This card is provided under a Creative Commons BY-NC license. You are free to use or modify the code under two conditions: you don't sell it and you provide attribution where required.




